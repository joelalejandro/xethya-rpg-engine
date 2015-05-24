import Ember from 'ember';
import Item from '../item';

/**
 * Represent a coin.
 *
 * @class Money
 * @extends {Item}
 */
export default Item.extend({
  itemType: Ember.computed(function() {
    return 'Money';
  }),

  /**
   * Returns the weight of a coin (0.05gr).
   *
   * @property weight
   * @type {number}
   * @readonly
   */
  weight: Ember.computed(function() {
    return 0.05;
  })
});
