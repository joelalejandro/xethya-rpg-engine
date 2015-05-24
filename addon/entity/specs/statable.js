import Ember from 'ember';

/**
 * Allows an entity to have stats to define its behaviours and possibilities.
 *
 * @class Statable
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   * 
   * @property hasStats
   * @type {boolean}
   * @default true
   */
  hasStats: Ember.computed(function() { return true; }),

  /**
   * Contains a collection of stats bound to the entity.
   *
   * @property stats
   * @type {Stat[]}
   */
  stats: Ember.computed(function() { return Ember.A(); }),

  /**
   * Triggers when the collection of stats is modified.
   *
   * @event statsChanged
   */
  statsChanged: Ember.observer('stats.@each', function() {
    Ember.assert(this.get('stats').every(function(s) {
      return s.get('_type') === 'Stat';
    }), 'statable.stats must contain instances of stat');
  }),

  /**
   * Gets a stat of the collection by its identifier.
   *
   * @method getStat
   * @param {string} id The identifier of the stat.
   * @return {Stat}
   */
  getStat: function(id) {
    return this.get('stats').findBy('id', id);
  },

  /**
   * Sets a stat's value.
   *
   * @method setStat
   * @param {string} id The identifier of the stat.
   * @param {number} value The stat's new value.
   */
  setStat: function(id, value) {
    this.getStat(id).set('currentValue', value);
  }
});
