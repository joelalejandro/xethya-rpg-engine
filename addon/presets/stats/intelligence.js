import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Intelligence stat.
 *
 * @class StatIntelligence
 * @extends {Stat}
 */
export default Stat.extend({

  id: Ember.computed(function() { return 'intelligence'; }),
  name: Ember.computed(function() { return 'Intelligence'; }),
  shortName: Ember.computed(function() { return 'INT'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
