import Ember from 'ember';
import Race from '../../utils/race';
import WearableSlot from '../../utils/wearable-slot';

/**
 * Represents the <%= camelizedModuleName %> race.
 *
 * @class <%= camelizedModuleName %>
 * @extends Race
 */
export default Race.extend({

  lifeExpectancy: Ember.computed(function() {
    return 100; // Max years of life
  }),

  primaryAttackStat: Ember.computed(function() {
    return 'strength'; // The ID of any defined attribute
  }),

  wearableSlots: Ember.computed(function() {
    return [
      //WearableSlot.create({ id: 'head' }),
      //WearableSlot.create({ id: 'leftRingFinger', itemCapacity: 2 }),
    ];
  })

});
