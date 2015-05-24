import Ember from 'ember';
import Item from '../item';

export default Item.extend(Ember.Evented, {
  isUseable: Ember.computed(function() { return true; }),

  use: function() {
    this.trigger('itemUse');
  }
});
