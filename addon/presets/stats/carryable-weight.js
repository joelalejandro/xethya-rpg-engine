import Ember from 'ember';
import Stat from '../../stats/stat';

/**
 * Defines the Carryable Weight stat.
 *
 * @class StatCarryableWeight
 * @extends {Stat}
 */
export default Stat.extend({

  id: Ember.computed(function() { return 'carryableWeight'; }),
  name: Ember.computed(function() { return 'Carryable Weight'; }),
  shortName: Ember.computed(function() { return 'CRW'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; }),

  /**
   * @property strength
   * @type {StatStrength}
   */
  strength: null,

  /**
   * @property constitution
   * @type {StatConstitution}
   */
  constitution: null,

  /**
   * Calculates how much weight the entity can carry.
   * The formula is:
   *
   *  (STR + CON) * 5
   *
   * @property currentValue
   * @type {number}
   * @readonly
   */
  currentValue: Ember.computed('strength', 'constitution', function() {
    let $STR = this.get('strength').getAffectedValue();
    let $CON = this.get('constitution').getAffectedValue();
    return ($STR + $CON) * 5;
  }),

  /**
   * Validates the depending stats for Carryable Weight.
   *
   * @method init
   */
  init: function() {
    this._super();

    Ember.assert(this.get('strength') && this.get('constitution'),
      'StatCarryableWeight depends on StatStrength and StatConstitution');
  }
});
