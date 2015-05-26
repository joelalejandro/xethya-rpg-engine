import Ember from 'ember';
import BasicMetadata from '../core/basic-metadata';

/**
 * @class  TurnTeam
 * @namespace Turns
 */
export default Ember.Object.extend(BasicMetadata, {

  _type: Ember.computed(function() {
    return 'TurnTeam';
  }),

  color: null,

  teamRelationships: Ember.computed(function() { return Ember.A(); }),

  teamRelationshipsChanged: Ember.observer('teamRelationships.@each', function() {
    Ember.assert(this.get('teamRelationships').every(function(tr) {
      return tr.get('_type') === 'TurnTeamRelationship';
    }), 'turnTeam.teamRelationships must contain instances of TurnTeamRelationship');
  })

});
