import random from '../wrappers/random';
import Ember from 'ember';

import OpenThrowDiceRoll from './rolls/open-throw';
import BlunderThrowDiceRoll from './rolls/blunder-throw';

import XtrpgConfiguration from '../configuration';

/**
 * Implements a dice thrower for the game.
 *
 * @class Dice
 * @extends {Ember.Object}
 * @namespace Dice
 */
export default Ember.Object.extend({
  _type: Ember.computed(function() {
    return 'Dice';
  }),

  /**
   * Contains the pseudo-random number generator.
   *
   * @property _mt
   * @private
   * @type {object}
   */
  _mt: Ember.computed(function() {
    let mt = random().engines.mt19937();
    mt.autoSeed();
    return mt;
  }),

  /**
   * Defines the minimum number that can be rolled by the dice.
   *
   * @property minimumValue
   * @type {number}
   */
  minimumValue: 1,

  /**
   * Triggers when the minimum roll number is modified.
   *
   * @event minimumValueChanged
   */
  minimumValueChanged: Ember.observer('minimumValue', function() {
    Ember.assert(!isNaN(this.get('minimumValue')),
      'dice.minimumValue must be a number');
  }),

  /**
   * Defines the maximum number that can be rolled by the dice.
   *
   * @property maximumValue
   * @type {number}
   */
  maximumValue: 10,

  /**
   * Triggers when the maximum roll number is modified.
   *
   * @event maximumValueChanged
   */
  maximumValueChanged: Ember.observer('maximumValue', function() {
    Ember.assert(!isNaN(this.get('maximumValue')),
      'dice.maximumValue must be a number');
  }),

  /**
   * Determines how many dices are thrown in the roll.
   *
   * @property diceCount
   * @type {number}
   */
  diceCount: 1,

  /**
   * Triggers when the dice count is modified.
   *
   * @event diceCountChanged
   */
  diceCountChanged: Ember.observer('diceCount', function() {
    Ember.assert(!isNaN(this.get('diceCount')),
      'dice.diceCount must be a number');
    Ember.assert(this.get('diceCount') > 0,
      'dice.diceCount must be at least 1');
  }),

  /**
   * Rolls one dice.
   *
   * @method rollOne
   * @return {number} A random number using the boundaries set in minimumValue
   *                  and maximumValue.
   */
  rollOne: function() {
    return random().integer(
      this.get('minimumValue'),
      this.get('maximumValue')
    )(this.get('_mt'));
  },

  /**
   * Rolls as many dices as diceCount specifies.
   *
   * @method rollMany
   * @return {number[]} An array of random numbers within minimumValue and maximumValue.
   */
  rollMany: function() {
    let roll = [];
    for (let d = 1; d <= this.get('diceCount'); d++) {
      roll.push(this.rollOne());
    }
    return roll;
  },

  /**
   * Rolls a floating number between 0 and 1. Useful for
   * probability calculation.
   *
   * @method rollChance
   * @return {number}
   */
  rollChance: function() {
    return random().real(0, 1, true)(this.get('_mt'));
  },

  /**
   * Resets the dice to its default settings.
   *
   * @method reset
   */
  reset: function() {
    this.set('minimumValue', 1);
    this.set('maximumValue', 10);
    this.set('diceCount', 1);
  },

  /**
   * Rolls an open dice throw. Sequence is as follows:
   * Dice is rolled. If the rolled number is between the open throw's boundaries
   * (defaults to 90 and 100), another dice is rolled, raising the open throw's
   * lower boundary by using the lower bound's difficulty increase rate (defaults to 1).
   * Then, if the next roll throws 91 or higher, another dice is rolled, and the lower
   * bound is raised to 92 and so on.
   * However, if the dice rolled falls in the blunder throw boundaries (defaults to 1 and 5),
   * the throw flow is redirected to the rollBlunderThrow() method.
   *
   * @method rollOpenThrow
   * @return {OpenThrowDiceRoll|BlunderThrowDiceRoll}
   */
  rollOpenThrow: function() {
    let roll = [];
    let isOpen = true;
    let lastNumber = 0;
    let openThrowLowerBound = XtrpgConfiguration.openThrow.lowerBound;
    let openThrowUpperBound = XtrpgConfiguration.openThrow.upperBound;
    let blunderThrowLowerBound = XtrpgConfiguration.blunderThrow.lowerBound;
    let blunderThrowUpperBound = XtrpgConfiguration.blunderThrow.upperBound;
    let lowerBoundDifficultyIncrease = XtrpgConfiguration.openThrow.lowerBoundDifficultyIncrease;
    this.set('minimumValue', 1);
    this.set('maximumValue', openThrowUpperBound);
    this.set('diceCount', 1);
    while (isOpen) {
      lastNumber = this.rollOne();
      if (lastNumber >= blunderThrowLowerBound && lastNumber <= blunderThrowUpperBound) {
        isOpen = false;
        return this.rollBlunderThrow();
      }
      if (lastNumber >= openThrowLowerBound && lastNumber <= openThrowUpperBound) {
        openThrowLowerBound += lowerBoundDifficultyIncrease;
      } else {
        isOpen = false;
      }
      roll.push(lastNumber);
    }
    this.reset();
    return OpenThrowDiceRoll.create({
      rolledNumbers: roll
    });
  },

  /**
   * Rolls a blunder dice throw. This method is usually executed when in the rollOpenThrow()
   * method a number that falls in the blunder range is rolled. Blunder severity is determined
   * according to a set of ranges defined in the environment settings.
   *
   * @method rollBlunderThrow
   * @return {BlunderThrowDiceRoll}
   */
  rollBlunderThrow: function() {
    let roll = 0;
    let lowerBlunderSeverity = XtrpgConfiguration.blunderThrow.lowerBlunderSeverity;
    let upperBlunderSeverity = XtrpgConfiguration.blunderThrow.upperBlunderSeverity;
    let severityFound = false;
    this.set('minimumValue', lowerBlunderSeverity);
    this.set('maximumValue', upperBlunderSeverity);
    this.set('diceCount', 1);
    roll = this.rollOne();

    let blunderThrow = BlunderThrowDiceRoll.create();

    Object.keys(XtrpgConfiguration.blunderThrow.severityRanges, function(key) {
      if (severityFound) {
        return;
      }

      let severity = XtrpgConfiguration.blunderThrow.severityRanges[key];
      if (roll >= severity[0] && roll <= severity[1]) {
        blunderThrow.set('rolledNumber', roll);
        blunderThrow.set('severityRange', severity);
        blunderThrow.set('severityLabel', key);
      }
    });

    this.reset();
    return blunderThrow;
  }
});
