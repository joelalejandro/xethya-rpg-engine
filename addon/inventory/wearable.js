import Ember from 'ember';
import Conditioned from './conditioned';

/**
 * Determines that an object can be worn.
 *
 * @class Wearable
 * @extends {Ember.Mixin}
 * @uses Conditioned
 */
export default Ember.Mixin.create(Conditioned, {
  /**
   * Determines if the mixin is active.
   *
   * @property isWearable
   * @type {boolean}
   * @default true
   */
  isWearable: Ember.computed(function() { return true; }),

  /**
   * Determines the slot IDs where the object can be worn.
   *
   * @property wearableSlot
   * @type {string[]}
   */
  wearableSlots: null,

  /**
   * Triggers when the wearable slot has changed.
   * Validates its type.
   *
   * @event wearableSlotChanged
   */
  wearableSlotChanged: Ember.observer('wearableSlot', function() {
    if (!this.get('isWearable')) {
      throw new Error('wearable.wearableSlotChanged: cannot observe if !isWearable');
    }

    if (this.get('_type') === 'Item') {
      if (this.get('owner.hasRace')) {
        let allowedSlots = this.get('owner.race');
        Ember.assert(this.get('wearableSlots').every(function(slot) {
          return !!allowedSlots.findBy('id', slot);
        }, 'wearable.wearableSlots must contain values available in race.wearableSlots'));
      }
    }
  }),

  /**
   * Short-hand method for wearing this item.
   *
   * @method wear
   * @param {string} slot
   */
  wear: function(slot) {
    if (!this.get('isWearable')) {
      throw new Error('wearable.wear: cannot run if !isWearable');
    }

    Ember.assert(this.get('_type') === 'Item',
      'wearable.wear: wearable must be an Item');
    Ember.assert(this.get('owner.canWear'),
      'wearable.wear: owner must have canWear = true');

    this.get('owner').wear(this, slot);
  },

  /**
   * Short-hand method for unwearing this item.
   *
   * @method unwear
   * @param {string} slot
   */
  unwear: function(slot) {
    if (!this.get('isWearable')) {
      throw new Error('wearable.wear: cannot unwear if !isWearable');
    }

    Ember.assert(this.get('_type') === 'Item',
      'wearable.wear: wearable must be an Item');
    Ember.assert(this.get('owner.canWear'),
      'wearable.wear: owner must have canWear = true');

    this.get('owner').unwear(this, slot);
  }
});
