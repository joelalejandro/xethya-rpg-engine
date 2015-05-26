import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Constitution stat.
 *
 * @class ConstitutionStat
 * @namespace Presets.Stats
 * @extends {Stat}
 */
export default Stat.extend({

  id: Ember.computed(function() { return 'constitution'; }),
  name: Ember.computed(function() { return 'Constitution'; }),
  shortName: Ember.computed(function() { return 'CON'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
