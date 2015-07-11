import Ember from 'ember';
import BasicMetadata from '../generics/basic-metadata';

export default Ember.Object.createWithMixins(BasicMetadata, {

  dialogues: Ember.computed(function() { return Ember.A(); }),
  entities: Ember.computed(function() { return Ember.A(); }),
  items: Ember.computed(function() { return Ember.A(); }),
  recipes: Ember.computed(function() { return Ember.A(); }),
  quests: Ember.computed(function() { return Ember.A(); }),

  setup: function() {

  },

  run: function() {

  }

});
