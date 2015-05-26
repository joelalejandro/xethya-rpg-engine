import Ember from 'ember';

/**
 * Represents a wallet, an object for managing money.
 *
 * @class Wallet
 * @namespace Economy
 * @extends {Ember.Object}
 */
export default Ember.Object.extend({
  /**
   * Contains a record of all transactions performed with the wallet.
   *
   * @property movements
   * @type {number[]}
   */
  movements: Ember.computed(function() { return Ember.A(); }),

  /**
   * Returns the current amount of money.
   *
   * @property balance
   * @type {number}
   */
  balance: Ember.computed('movements.@each', function() {
    return this.get('movements').reduce(function(a, b) {
      return a + b;
    });
  }),

  /**
   * Adds money to the wallet.
   *
   * @method credit
   * @param {number} amount
   */
  credit: function(amount) {
    Ember.assert(!isNaN(amount), 'wallet.credit: amount must be a number');
    Ember.assert(amount > 0, 'wallet.credit: amount must be > 0');
    this.get('movements').push(amount);
  },

  /**
   * Takes money from the wallet.
   *
   * @method debit
   * @param {number} amount
   */
  debit: function(amount) {
    Ember.assert(!isNaN(amount), 'wallet.debit: amount must be a number');
    Ember.assert(amount > 0, 'wallet.debit: amount must be > 0');
    this.get('movements').push(-amount);
  },

  /**
   * Checks if a debit of a given amount can be
   * made in the wallet.
   *
   * @method canAfford
   * @param {number} amount
   * @return {boolean}
   */
  canAfford: function(amount) {
    return this.get('balance') - amount >= 0;
  }
});
