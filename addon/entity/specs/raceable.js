import Ember from 'ember';
import GenericRace from './race';

/**
 * Allows a living entity to have a race specified.
 *
 * @class Raceable
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property hasRace
   * @type {boolean}
   * @default true
   */
  hasRace: Ember.computed(function() { return true; }),

  /**
   * Defines the entity's race.
   *
   * @property race
   * @type {Race}
   */
  race: Ember.computed(function() { return GenericRace.create(); })
});
