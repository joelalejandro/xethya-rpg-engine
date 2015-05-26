import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Agility stat.
 *
 * @class StatAgility
 * @extends {Stat}
 */
export default Stat.extend({
  id: Ember.computed(function() { return 'agility'; }),
  name: Ember.computed(function() { return 'Agility'; }),
  shortName: Ember.computed(function() { return 'AGI'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
