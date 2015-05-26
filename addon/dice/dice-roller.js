import Ember from 'ember';
import Dice from './dice';

/**
 * Allows any object to access the dice thrower.
 *
 * @class DiceRoller
 * @extends {Ember.Mixin}
 * @namespace Dice
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property hasDiceRoller
   * @type {boolean}
   * @default true
   */
  hasDiceRoller: Ember.computed(function() { return true; }),

  /**
   * Contains an instance of Dice.
   *
   * @property dice
   * @type Dice
   */
  dice: Ember.computed(function() {
    return Dice.create();
  })
});
