import Ember from 'ember';
import Race from '../race';
import StatStrength from '../stats/strength';
import WearableSlot from '../../../inventory/wearable-slot';

/**
 * This class describes the features of the human race.
 * It sets a life expectancy of 115 years, Strength as its
 * primary attack stat, and 20 wearable slots.
 *
 * @class RaceHuman
 * @extends {Race}
 */
export default Race.extend({
  lifeExpectancy: Ember.computed(function() {
    return 115;
  }),

  primaryAttackStat: Ember.computed(function() {
    return 'strength';
  }),

  wearableSlots: Ember.computed(function() {
    return [
      WearableSlot.create({ id: 'head' }),
      WearableSlot.create({ id: 'neck' }),
      WearableSlot.create({ id: 'leftEar' }),
      WearableSlot.create({ id: 'rightEar' }),
      WearableSlot.create({ id: 'chest' }),
      WearableSlot.create({ id: 'hands' }),
      WearableSlot.create({ id: 'leftHand' }),
      WearableSlot.create({ id: 'rightHand' }),
      WearableSlot.create({ id: 'leftRingFinger', itemCapacity: 2 }),
      WearableSlot.create({ id: 'rightRingFinger', itemCapacity: 2 }),
      WearableSlot.create({ id: 'leftWrist' }),
      WearableSlot.create({ id: 'rightWrist' }),
      WearableSlot.create({ id: 'shoulders' }),
      WearableSlot.create({ id: 'leftArm' }),
      WearableSlot.create({ id: 'rightArm' }),
      WearableSlot.create({ id: 'waist' }),
      WearableSlot.create({ id: 'legs' }),
      WearableSlot.create({ id: 'feet' })
    ];
  })
});
