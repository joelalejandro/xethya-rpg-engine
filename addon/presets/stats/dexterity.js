import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Dexterity stat.
 *
 * @class StatDexterity
 * @extends {Stat}
 */
export default Stat.extend({

  id: Ember.computed(function() { return 'dexterity'; }),
  name: Ember.computed(function() { return 'Dexterity'; }),
  shortName: Ember.computed(function() { return 'DEX'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; })
});
