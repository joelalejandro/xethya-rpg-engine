import Ember from 'ember';
import BasicMetadata from '../generics/basic-metadata';

/**
 * Represents an entity's race.
 *
 * @class Race
 * @namespace Races
 * @extends {Ember.Object}
 * @uses BasicMetadata
 */
export default Ember.Object.extend(BasicMetadata, {
  _type: Ember.computed(function() {
    return 'Race';
  }),

  /**
   * Sets the maximum age an entity of this race can reach.
   *
   * @property lifeExpectancy
   * @type {number}
   */
  lifeExpectancy: null,

  /**
   * Triggers when the life expectancy of the race is modified.
   *
   * @event lifeExpectancyChanged
   */
  lifeExpectancyChanged: Ember.observer('lifeExpectancy', function() {
    Ember.assert(!isNaN(this.get('lifeExpectancy')),
      'race.lifeExpectancy must be a number');
  }),

  /**
   * Sets which is the primary stat in the Attack skill
   * calculation for this race. Must be a valid
   * stat id.
   *
   * @property primaryAttackStat
   * @type {string}
   */
  primaryAttackStat: null,

  /**
   * Triggers when primaryAttackStat is changed.
   *
   * @event primaryAttackStatChanged
   */
  primaryAttackStatChanged: function() {
    Ember.assert(typeof this.get('primaryAttackStat') === 'string',
      'race.primaryAttackStat must be a string');
  },

  /**
   * Defines the places of the body where items can be worn.
   *
   * @property wearableSlots
   * @type {WearableSlot[]}
   */
  wearableSlots: Ember.computed(function() { return Ember.A(); })
});
