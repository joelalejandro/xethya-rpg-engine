import Ember from 'ember';
import Effect from '../../effects/effect';

/**
 * Defines the Wounding effect. Wounding decreases
 * Constitution.
 *
 * @class Wounding
 * @extends {Effect}
 */
export default Effect.extend({
  id: Ember.computed(function() {
    return 'wounding';
  }),

  name: Ember.computed(function() {
    return 'Wounding';
  }),

  isNumeric: Ember.computed(function() {
    return true;
  }),

  /**
   * Wounding modifies the Constitution stat.
   */
  affects: Ember.computed(function() {
    return ['stat:constitution'];
  }),

  /**
   * Wounding has a minimum level of 1.
   */
  minimumGrade: Ember.computed(function() {
    return 1;
  }),

  /**
   * Wounding has a maximum level of 3.
   */
  maximumGrade: Ember.computed(function() {
    return 3;
  }),

  /**
   * Wounding decreases constitution by half
   * of the effect level.
   */
  value: Ember.computed(function() {
    return -this.get('grade') * 0.5;
  })
});
