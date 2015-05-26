import Ember from 'ember';
import Item from './item';

/**
 * @class UseableItem
 * @namespace Items
 */
export default Item.extend(Ember.Evented, {
  isUseable: Ember.computed(function() { return true; }),

  use: function() {
    this.trigger('itemUse');
  }
});
