import Ember from 'ember';

/**
 * Handles wearing and unwearing objects in an entity.
 *
 * @class Wearer
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property canWear
   * @type {boolean}
   * @default true
   */
  canWear: Ember.computed(function() { return true; }),

  /**
   * Stores worn items.
   *
   * @property wearing
   * @type {Ember.Object}
   */
  wearing: Ember.computed(function() { return Ember.Object.create({}); }),

  /**
   * Wears an Item in a slot.
   *
   * @method wear
   * @param {Item} item
   * @param {string} slot
   */
  wear: function(item, slot) {
    let willWear = (item.get('isConditioned') &&
        item.areConditionsMet())
        || !this.get('isConditioned');

    if (willWear) {
      if (Array.isArray(this.get('wearing.') + slot)) {
        this.get('wearing.' + slot).pushObject(item);
      } else {
        this.get('wearing').set(slot, item);
      }
    }
  },

  /**
   * Unwears all items from a slot.
   *
   * @method unwearAll
   * @param {string} slot
   */
  unwearAll: function(slot) {
    this.get('wearing').set(slot, null);
  },

  /**
   * Unwears a specific item from a slot.
   *
   * @method unwear
   * @param {Item} item
   * @param {string} slot
   */
  unwear: function(item, slot) {
    this.get('wearing.' + slot).removeObject(item);
  }
});
