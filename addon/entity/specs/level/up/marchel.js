import Ember from 'ember';

/**
 * Defines an algorithm for leveling up entities, based on the
 * formula built by Marcelo Ariel Mira Marín (@marcemira_dev).
 *
 * @class MarchelLevelUp
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
    let i = 1;
    let xp = 0;
    while (i <= level) {
      xp += Math.floor(Math.floor(level + 125 * Math.pow(2, (level / 13.203638))) / 4);
    }
    return xp;
  }
});
