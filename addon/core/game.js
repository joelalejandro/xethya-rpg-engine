import Ember from 'ember';

export default Ember.Object.create({

  id: 'xtrpg-game',
  name: 'A Xtrpg-based game',

  _dialogues: [],
  _entities: [],
  _items: [],
  _recipes: [],
  _quests: [],

  setup: function() {

  },

  run: function() {
    this.setup();
  }

});
