import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Weight stat.
 *
 * @class WeightStat
 * @namespace Presets.Stats
 * @extends {Stat}
 */
export default Stat.extend({
  id: Ember.computed(function() { return 'weight'; }),
  name: Ember.computed(function() { return 'Weight'; }),
  shortName: Ember.computed(function() { return 'WEI'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; }),

  size: null,

  /*currentValue: function() {
    this.get('size').getRawValue();
  }.property('size')*/

  init: function() {
    this._super();

    Ember.assert(this.get('size'), 'StatWeight depends on StatSize');
  }
});
