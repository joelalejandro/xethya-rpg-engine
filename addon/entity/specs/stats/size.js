import Ember from 'ember';
import Stat from '../stat';

/**
 * Defines the Size stat.
 *
 * @class StatSize
 * @extends {Stat}
 */
export default Stat.extend({

  id: Ember.computed(function() { return 'size'; }),
  name: Ember.computed(function() { return 'Size'; }),
  shortName: Ember.computed(function() { return 'SIZ'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; }),

  /**
   * @property constitution
   * @type {StatConstitution}
   */
  constitution: null,

  currentValue: Ember.computed('constitution', function() {
    return this.get('constitution').getRawValue();
  }),

  init: function() {
    this._super();

    Ember.assert(this.get('constitution'), 'StatSize depends on StatConstitution');
  }
});
