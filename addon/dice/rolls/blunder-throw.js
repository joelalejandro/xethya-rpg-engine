import Ember from 'ember';

/**
 * Represents the result of a blunder dice throw.
 *
 * @class BlunderThrowDiceRoll
 * @extends {Ember.Object}
 */
export default Ember.Object.extend({
  _type: Ember.computed(function() {
    return 'BlunderThrowDiceRoll';
  }),

  isBlunder: true,

  /**
   * Holds the dice number from the roll.
   *
   * @property rolledNumber
   * @type {number}
   */
  rolledNumber: null,

  /**
   * Defines the lower and upper bounds of the blunder severity.
   *
   * @property severityRange
   * @type {number[]}
   */
  severityRange: Ember.computed(function() { return Ember.A(); }),

  /**
   * Defines the severity key of this blunder throw.
   *
   * @property severityLabel
   * @type {string}
   */
  severityLabel: null
});
