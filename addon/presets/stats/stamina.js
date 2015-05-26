import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Stamina stat.
 *
 * @class StaminaStat
 * @namespace Presets.Stats
 * @extends {Stat}
 */
export default Stat.extend({
  id: Ember.computed(function() { return 'stamina'; }),
  name: Ember.computed(function() { return 'Stamina'; }),
  shortName: Ember.computed(function() { return 'STA'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
