import Ember from 'ember';

/**
 * Represents the result of an open dice throw.
 *
 * @class OpenThrowDiceRoll
 * @extends {Ember.Object}
 */
export default Ember.Object.extend({
  _type: Ember.computed(function() {
    return 'OpenThrowDiceRoll';
  }),

  isOpen: true,

  /**
   * Holds the list of numbers rolled with the dice.
   *
   * @property rolledNumbers
   * @type {number[]}
   */
  rolledNumbers: Ember.computed(function() { return Ember.A(); }),

  /**
   * Counts how long is the open throw.
   *
   * @property rolledNumberCount
   * @readOnly
   * @type {number}
   */
  rolledNumberCount: Ember.computed('rolledNumbers', function() {
    return this.get('rolledNumbers.length');
  }),

  /**
   * Sums all values in the open throw.
   *
   * @property rolledNumberSum
   * @readOnly
   * @type {number}
   */
  rolledNumberSum: Ember.computed('rolledNumbers', function() {
    return this.get('rolledNumbers').reduce(function(a, b) { return a + b; });
  })
});
