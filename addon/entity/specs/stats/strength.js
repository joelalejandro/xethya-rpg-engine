import Ember from 'ember';
import Stat from '../stat';

/**
 * Defines the Strength stat.
 *
 * @class StatStrength
 * @extends {Stat}
 */
export default Stat.extend({
  id: Ember.computed(function() { return 'strength'; }),
  name: Ember.computed(function() { return 'Strength'; }),
  shortName: Ember.computed(function() { return 'STR'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
