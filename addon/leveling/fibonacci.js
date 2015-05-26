import Ember from 'ember';

/**
 * Defines an algorithm for leveling up entities, based on the
 * Fibonacci number.
 * See http://en.wikipedia.org/wiki/Fibonacci_number#Relation_to_the_golden_ratio
 * for more information regarding the formula.
 *
 * @class FibonacciLevelUp
 * @extends {Ember.Object}
 */
export default Ember.Object.extend({
  /**
   * Determines how much experience is required to reach a given level.
   *
   * @method experienceRequiredForLevel
   * @param {number} level
   * @return {number}
   */
  experienceRequiredForLevel: function(level) {
    let au = (1 + Math.sqrt(5)) / 2;
    return Math.ceil((Math.pow(au, level) - Math.pow(1 - au, level)) / Math.sqrt(5));
  }
});
