import Ember from 'ember';

/**
 * Allows injecting skills to an object. Useful
 * for calculating rolls or validating behaviours.
 *
 * @class SkillDepending
 * @namespace Skills
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property isSkillDepending
   * @type {boolean}
   * @default true
   */
  isSkillDepending: Ember.computed(function() { return true; }),

  /**
   * Defines which skills should be used to calculate
   * the weapon's accuracy and damage.
   *
   * @property reliesOnSkills
   * @type {Skill[]}
   */
  reliesOnSkills: Ember.computed(function() { return Ember.A(); })
});
