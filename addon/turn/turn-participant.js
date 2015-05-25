import Ember from 'ember';
import BasicMetadata from '../core/basic-metadata';

export default Ember.Object.extend(BasicMetadata, {

  _type: Ember.computed(function() {
    return 'TurnParticipant';
  }),

  id: Ember.computed('entity._uuid', function() {
    return this.get('entity._uuid');
  }),

  entity: null,

  teams: null,

  initiative: 0,

  currentlyPlaying: false

});
