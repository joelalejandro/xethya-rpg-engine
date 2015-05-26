import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Spirit stat.
 *
 * @class SpiritStat
 * @namespace Presets.Stats
 * @extends {Stat}
 */
export default Stat.extend({
  id: Ember.computed(function() { return 'spirit'; }),
  name: Ember.computed(function() { return 'Spirit'; }),
  shortName: Ember.computed(function() { return 'SPI'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
