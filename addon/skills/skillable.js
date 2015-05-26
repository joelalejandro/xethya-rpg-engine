import Ember from 'ember';
import MUGRE from '../../misc/filthy-stuff';

/**
 * Allows an entity to possess skills and abilities.
 *
 * @class Skillable
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property hasSkills
   * @type {boolean}
   * @default true
   */
  hasSkills: Ember.computed(function() { return true; }),

  /**
   * Contains a collection of skills bound to the entity.
   *
   * @property skills
   * @type {Skill[]}
   */
  skills: Ember.computed(function() { return Ember.A(); }),

  /**
   * Triggers when the collection of skills is modified.
   *
   * @event skillsChanged
   */
  skillsChanged: Ember.observer('skills.@each', function() {
    Ember.assert(this.get('skills').every(function(s) {
      return s.get('_type') === 'Skill';
    }), 'skillable.skills must contain instances of skill');
  }),

  /**
   * Triggers when any change in the stats is produced.
   *
   * @private
   * @todo Replace MUGRE.syncStatsWithSkills with proper observer-based code.
   */
  syncStatsWithSkills: Ember.observer('stats.@each', function() {
    MUGRE.syncStatsWithSkills(this);
  }),

  /**
   * Gets a skill of the collection by its identifier.
   *
   * @method getSkill
   * @param {string} id The identifier of the skill.
   * @return {Skill}
   */
  getSkill: function(id) {
    return this.get('skills').findBy('id', id);
  },

  /**
   * Sets a skill's value.
   *
   * @method setSkill
   * @param {string} id The identifier of the skill.
   * @param {number} value The skill's new value.
   */
  setSkill: function(id, value) {
    this.getSkill(id).set('currentValue', value);
  }
});
