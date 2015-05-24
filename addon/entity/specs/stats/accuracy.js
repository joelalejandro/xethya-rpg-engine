import Ember from 'ember';
import Stat from '../stat';

/**
 * Defines the Accuracy stat.
 *
 * @class StatAccuracy
 * @extends {Stat}
 */
export default Stat.extend({

  id: Ember.computed(function() { return 'accuracy'; }),
  name: Ember.computed(function() { return 'Accuracy'; }),
  shortName: Ember.computed(function() { return 'ACC'; }),
  minimumValue: Ember.computed(function() { return 1; }),
  maximumValue: Ember.computed(function() { return Infinity; }),

  /**
   * @property dexterity
   * @type {StatDexterity}
   */
  dexterity: null,

  /**
   * @property agility
   * @type {StatAgility}
   */
  agility: null,

  /**
   * Calculates the entity's accuracy, depending on
   * its dexterity and agility.
   * The formula is an average of these stats:
   *
   *  floor((DEX + AGI) / 2)
   *
   * @property currentValue
   * @type {number}
   * @readonly
   */
  currentValue: Ember.computed('dexterity', 'agility', function() {
    let $DEX = this.get('dexterity').getAffectedValue();
    let $AGI = this.get('agility').getAffectedValue();
    return Math.floor(($DEX + $AGI) / 2);
  }),

  /**
   * Validates the depending stats for Accuracy.
   *
   * @method init
   */
  init: function() {
    this._super();

    Ember.assert(this.get('dexterity') && this.get('agility'),
      'StatAccuracy depends on StatDexterity and StatAgility');
  }
});
