import Ember from 'ember';
import Skill from '../../skills/skill';

/**
 * Defines the Dodge Skill.
 *
 * @class DodgeSkill
 * @namespace Presets.Skills
 * @extends {Skill}
 */
export default Skill.extend({

  id: Ember.computed(function() { return 'dodge'; }),
  name: Ember.computed(function() { return 'Dodge'; }),

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
   * @property weight
   * @type {StatWeight}
   */
  weight: null,

  /**
   * Registers the depending stats for this skill.
   *
   * @method init
   */
  init: function() {
    this.get('reliesOnStats').pushObject(this.get('dexterity'));
    this.get('reliesOnStats').pushObject(this.get('agility'));
    this.get('reliesOnStats').pushObject(this.get('weight'));
  },

  /**
   * Calculates the Dodge index for a living entity.
   * The formula used is:
   *
   * Free Dodge Index (FDI)
   * ----------------------
   *  FDI = 12 * DEX * AGI
   *   where DEX is the dexterity stat
   *     and AGI is the agility stat
   *
   * Weight Factor (WEF)
   * -------------------
   *  WEF = √(WEI * 1.8)
   *   where WEI is the weight stat
   *
   * Then, the calculation returns:
   *
   *  floor(FDI / WEF * 0.7)
   *
   * @property currentValue
   * @type {number}
   * @readonly
   */
  currentValue: Ember.computed('dexterity', 'agility', 'weight', function() {
    let $DEX = this.get('dexterity').getAffectedValue(),
        $AGI = this.get('agility').getAffectedValue(),
        $WEI = this.get('weight').getAffectedValue();

    let FDI = 12 * $DEX * $AGI,
        WEF = Math.sqrt($WEI * 1.8);

    return Math.floor(FDI / WEF * 0.7);
  })
});
