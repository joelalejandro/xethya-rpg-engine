import Ember from 'ember';
import Effect from '../../effects/effect';

/**
 * Defines behaviours for the Sharpness Effect.
 * Sharpness increases attack.
 *
 * @class Sharpness
 * @extends {Effect}
 */
export default Effect.extend({
  id: Ember.computed(function() {
    return 'sharpness';
  }),

  name: Ember.computed(function() {
    return 'Sharpness';
  }),

  isNumeric: Ember.computed(function() {
    return true;
  }),

  /**
   * Sharpness modifies the Attack skill.
   */
  affects: Ember.computed(function() {
    return ['skill:attack'];
  }),

  /**
   * Sharpness has a minimum level of 1.
   */
  minimumGrade: Ember.computed(function() {
    return 1;
  }),

  /**
   * Sharpness has a maximum level of 4.
   */
  maximumGrade: Ember.computed(function() {
    return 4;
  }),

  /**
   * Sharpness is calculated as a boost of
   * 50 points of attack per grade.
   */
  value: Ember.computed(function() {
    return 50 * this.get('grade');
  }),

  duration: Ember.computed(function() {
    return 10 * this.get('grade');
  })
});
