import Ember from 'ember';
import Stat from '../stat';

/**
 * Defines the Stamina stat.
 *
 * @class StatStamina
 * @extends {Stat}
 */
export default Stat.extend({
  id: Ember.computed(function() { return 'stamina'; }),
  name: Ember.computed(function() { return 'Stamina'; }),
  shortName: Ember.computed(function() { return 'STA'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
