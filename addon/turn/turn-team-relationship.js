import Ember from 'ember';

export default Ember.Object.extend({

  _type: Ember.computed(function() {
    return 'TurnTeamRelationship';
  }),

  team: null,

  teamChanged: Ember.observer('team', function() {
    Ember.assert(this.get('team._type') === 'TurnTeam',
      'turnTeamRelationship.team must be an instance of TurnTeam');
  }),

  relationship: null,

  relationshipChanged: Ember.observer('relationship', function() {
    Ember.assert(
      ['hostile', 'neutral', 'friendly'].contains(this.get('relationship')),
      'turnTeamRelationship.relationship must be hostile, neutral, or friendly'
    );
  })

});
