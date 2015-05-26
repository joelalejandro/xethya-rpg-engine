import Ember from 'ember';
import DiceRoller from '../dice/dice-roller';
import TurnParticipant from './turn-participant';
import TurnTeam from './turn-team';
import TurnTeamRelationship from './turn-team-relationship';

/**
 * @class Turn
 * @namespace Turns
 * @extends {Ember.Object}
 * @uses Ember.Evented
 * @uses DiceRoller
 */
export default Ember.Object.extend(Ember.Evented, DiceRoller, {

  /**
   * Defines the current round of the turn.
   *
   * @property currentRound
   * @type {Number}
   */
  currentRound: 0,

  /**
   * Defines how many rounds can the turn contain.
   *
   * @property roundLimit
   * @type {Number}
   */
  roundLimit: Infinity,

  /**
   * Contains a list of all entities involved in the action turn.
   *
   * @property participants
   * @type {Entity[]}
   */
  participants: Ember.computed(function() { return Ember.A(); }),

  /**
   * Contains a list of all teams/factions involved in the action turn.
   *
   * @property teams
   * @type {TurnTeam[]}
   */
  teams: Ember.computed(function() { return Ember.A(); }),

  /**
   * Returns a list of entity UUIDs representing the order in which
   * entities will play during this round of the action turn.
   *
   * @property playingOrder
   * @type {string[]}
   */
  playingOrder: Ember.computed('participants.@each', function() {
    return this.get('participants')
               .sortBy('initiative')
               .reverse()
               .map(function(p) {
                 return p.get('_uuid');
               });
  }),

  /**
   * Returns the participant that is currently allowed to perform
   * an action.
   *
   * @property currentParticipant
   * @type TurnParticipant
   */
  currentParticipant: Ember.computed('participants.@each', function() {
    return this.get('participants').findBy('currentlyPlaying', true);
  }),

  /**
   * Registers a team/faction in the turn. This allows to restrict
   * the type of actions entities can perform among each other.
   * Teams can be hostile, neutral or friendly in their relationships
   * with other teams. Such teams can be declared with the
   * shorthand syntax:
   *
   * ```javascript
   * turn.addTeam('xethya-rockstars#305832',
   *  ['xethya-criminals:hostile', 'xethya-angels:friendly']);
   * ```
   *
   * Or with the object-based syntax:
   *
   * ```javascript
   * turn.addTeam(TurnTeam.create({
   *   id: 'xethya-rockstars'
   *   name: 'Xethya Rockstars',
   *   color: '305832',
   *   relationships: [
   *     TurnTeamRelationship.create({
   *       team: TurnTeam.create({ id: 'xethya-criminals' }),
   *       relationship: 'hostile'
   *     }),
   *     TurnTeamRelationship.create({
   *       team: TurnTeam.create({ id: 'xethya-angels' }),
   *       relationship: 'friendly'
   *     })
   *   ]
   * }));
   * ```
   *
   * @method addTeam
   * @param {TurnTeam|string} team
   * @param {TurnRelationship[]|string[]} relationships
   */
  addTeam: function(team, relationships) {
    let _teamData = {};
    if (team.get('_type') === 'TurnTeam') {
      this.get('teams').pushObject(team);
    } else if (typeof team === 'string') {
      let teamRelationships = Ember.A();
      if (team.indexOf('#') > -1) {
        let teamData = team.split('#');
        _teamData.name = teamData[0];
        _teamData.color = teamData[1];
      } else {
        _teamData.name = team;
      }
      if (relationships !== null && Array.isArray(relationships) &&
          relationships.every(function(r) { return typeof r === 'string'; })) {
        teamRelationships = relationships.map(function(r) {
          if (r.indexOf(':') === 0) {
            return null;
          }

          let relationshipData = r.split(':');
          let teamName = relationshipData[0];
          let teamRelationship = relationshipData[1];

          return TurnTeamRelationship.create({
            team: TurnTeam.create({ id: Ember.string.camelize(teamName) }),
            relationship: teamRelationship.toLowerCase()
          });
        }).filter(function(r) { return r !== null; });
      }
      this.get('teams').pushObject(TurnTeam.create({
        id: Ember.string.camelize(_teamData.name),
        name: Ember.string.classify(_teamData.name),
        color: _teamData.color,
        teamRelationships: teamRelationships
      }));
    }
  },

  /**
   * Removes a team/faction from the turn, removing any membership
   * for the participants to such team.
   *
   * @method removeTeam
   * @param  {string} teamId
   */
  removeTeam: function(teamId) {
    this.get('participants').forEach(function(p) {
      p.set('teams', this.get('teams').reject('teamId'));
    });
    this.set('teams', this.get('teams').rejectBy('id', teamId));
  },

  /**
   * Verifies if a participant is signed up in the turn.
   *
   * @function hasParticipant
   * @param  {TurnPartipant|string}  participant
   * @return {Boolean}
   */
  hasParticipant: function(participant) {
    return this.get('participants').findBy('_uuid',
      participant.get('_uuid') || participant) !== null;
  },

  /**
   * Verifies if a team/faction is registered in the turn.
   *
   * @function hasTeam
   * @param  {TurnTeam|string}  team
   * @return {Boolean}
   */
  hasTeam: function(team) {
    return this.get('teams').findBy('id', team.get('id') || team) !== null;
  },

  /**
   * Registers a living entity as a participant in the turn.
   * Optionally, it is possible to register the participant
   * in a team.
   *
   * @method addParticipant
   * @param {LivingEntity} livingEntity
   * @param {string} teamId
   */
  addParticipant: function(livingEntity, teamId) {
    Ember.assert(livingEntity.get('_type') === 'LivingEntity',
      'turn.participants can only contain instances of LivingEntity');

    if (this.hasParticipant(livingEntity)) {
      return;
    }

    Ember.assert(this.hasTeam(teamId),
      'turn.addParticipant: team ' + teamId + ' does not exists');

    this.get('participants').pushObject(TurnParticipant.create({
      entity: livingEntity,
      teams: teamId ? ['all', teamId] : ['all']
    }));
  },

  /**
   * Removes a participant from the turn.
   *
   * @method removeParticipant
   * @param  {LivingEntity|string} livingEntity
   */
  removeParticipant: function(livingEntity) {
    let id = typeof livingEntity === 'string' ? livingEntity : livingEntity.get('_uuid');
    this.set('participants', this.get('participants').rejectBy('_uuid', id));
    this.set('playingOrder', this.get('playingOrder').reject(id));
  },

  /**
   * Calculates the initiative index for each participant,
   * using an open throw dice roll.
   *
   * @method rollInitiative
   */
  rollInitiative: function() {
    let _this = this;
    this.get('participants').forEach(function(participant) {
      let roll = _this.get('dice').rollOpenThrow();
      let initiative = roll.get('isBlunder') ? roll.get('rolledNumber') : roll.get('rolledNumberSum');
      participant.set('initiative', initiative);
    });
  },

  /**
   * Informs that the specified participant is the current
   * player in the turn.
   *
   * @param {String|TurnParticipant} participant
   */
  setCurrentParticipant: function(participant) {
    this.get('participants').forEach(function(p) { p.set('currentlyPlaying', false); });
    if (typeof participant === 'string') {
      this.get('participants').findBy('_uuid', participant).set('currentlyPlaying', true);
    } else if (participant.get('_type') === 'TurnParticipant') {
      participant.set('currentlyPlaying', true);
    }
  },

  /**
   * Begins a new round in the turn. Rolls initiative for all
   * participants, sets the participant with the highest roll
   * as first and marks the current round number.
   *
   * @method beginRound
   */
  beginRound: function() {
    this.rollInitiative();
    this.setCurrentParticipant(this.get('playingOrder.firstObject'));
    this.incrementProperty('currentRound');
    if (this.get('currentRound') + 1 > this.get('roundLimit')) {
      this.end();
    }
  },

  /**
   * Finishes the turn.
   *
   * @method end
   */
  end: function() {
    this.trigger('turnEnded');
  },

  /**
   * Initializes the turn. By default, this method registers a
   * generic 'all' team, so any participant is part of that
   * team.
   *
   * @method init
   */
  init: function() {
    this._super();

    this.addTeam('all#ffffff', null);
  }
});
