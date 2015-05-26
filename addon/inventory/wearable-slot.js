import Ember from 'ember';
import BasicMetadata from '../generics/basic-metadata';

/**
 * Defines a slot where items can be worn in
 * a body. Slots are defined per race.
 *
 * @class WearableSlot
 * @extends {Ember.Object}
 * @uses BasicMetadata
 */
export default Ember.Object.extend(BasicMetadata, {
  /**
   * Indicates how many items can be worn in this slot.
   *
   * @property itemCapacity
   * @type {Number}
   */
  itemCapacity: 1,

  /**
   * Restricts this slot to particular gender IDs.
   * If empty, there is no restriction.
   *
   * @property allowedGenders
   * @type {string[]}
   */
  allowedGenders: Ember.computed(function() { return Ember.A(); })
});
