import Ember from 'ember';

/**
 * Contains the result of a skill execution.
 * 
 * @class SkillDiceRoll
 * @extends {Ember.Object}
 */
export default Ember.Object.extend({
  /**
   * Contains the dice roll resulting from the
   * skill's usage.
   * 
   * @property diceRoll
   * @type {OpenThrowDiceRoll|BlunderThrowDiceRoll}
   */
  diceRoll: null,
  
  /**
   * Determines whether the skill's dice roll is a blunder or not.
   * 
   * @property isBlunder
   * @type {boolean}
   */
  isBlunder: Ember.computed('diceRoll', function() {
    return this.get('diceRoll._type') === 'BlunderThrowDiceRoll';
  }),
  
  /**
   * Contains the total sum of the skill's value
   * and the dice roll numbers.
   * 
   * @property skillResult
   * @type {number}
   */
  skillResult: null
});
