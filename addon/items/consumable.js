import Ember from 'ember';
import ItemUseable from './useable';

/**
 * @class ConsumableItem
 * @namespace Items
 */
export default ItemUseable.extend({
  isConsumable: Ember.computed(function() { return true; }),

  use: function() {
    this._super();
    this.get('owner').dropObject(this, 1);
  }
});
