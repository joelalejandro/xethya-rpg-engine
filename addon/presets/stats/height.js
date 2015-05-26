import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Height stat.
 *
 * @class HeightStat
 * @namespace Presets.Stats
 * @extends {Stat}
 */
export default Stat.extend({

  id: Ember.computed(function() { return 'height'; }),
  name: Ember.computed(function() { return 'Height'; }),
  shortName: Ember.computed(function() { return 'HEI'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; }),

  size: null,

  /*currentValue: function() {
    this.get('size').getRawValue();
  }.property('size')*/

  init: function() {
    this._super();

    Ember.assert(this.get('size'), 'StatHeight depends on StatSize');
  }
});
