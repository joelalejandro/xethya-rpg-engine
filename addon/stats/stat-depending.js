import Ember from 'ember';

/**
 * Allows injecting stats to an object. Useful
 * for calculating rolls or validating behaviours.
 *
 * @class StatDepending
 * @namespace Stats
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determine if the mixin is active.
   *
   * @property isStatDepending
   * @type {boolean}
   * @default true
   */
  isStatDepending: Ember.computed(function() { return true; }),

  /**
   * Defines which stats should be used to calculate
   * the weapon's accuracy and damage.
   *
   * @property reliesOnStats
   * @type {Stat[]}
   */
  reliesOnStats: Ember.computed(function() { return Ember.A(); }),
});
