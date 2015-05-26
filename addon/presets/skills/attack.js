import Ember from 'ember';
import Skill from '../../skills/skill';

/**
 * Defines the Attack Skill.
 *
 * @class SkillAttack
 * @extends {Skill}
 */
export default Skill.extend({

  id: Ember.computed(function() { return 'attack'; }),
  name: Ember.computed(function() { return 'Attack'; }),

  /**
   * @property strength
   * @type {StatStrength}
   */
  strength: null,

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
   * @property accuracy
   * @type {StatAccuracy}
   */
  accuracy: null,

  /**
   * @property primaryAttackStat
   * @type {string}
   */
  primaryAttackStat: null,

  /**
   * Registers the depending stats for this skill.
   *
   * @method init
   */
  init: function() {
    this._super();

    this.get('reliesOnStats').pushObject(this.get('strength'));
    this.get('reliesOnStats').pushObject(this.get('dexterity'));
    this.get('reliesOnStats').pushObject(this.get('agility'));
    this.get('reliesOnStats').pushObject(this.get('accuracy'));
  },

  /**
   * Returns the Attack skill value. The calculation depends
   * on the primary attack stat set by the living entity's
   * race. The formula is:
   *
   * Attack Index (ATK)
   * ------------------
   * ATK = 0.7 * (PAS^4 + AST^3 + BST^2)
   *  where PAS is the primary attack stat
   *        AST is the first non-primary attack stat
   *        BST is the second non-primary attack stat
   *
   * Accuracy Index (ACI)
   * --------------------
   * ACI = 1 + ACC * 0.1
   *  where ACC is the accuracy stat
   *
   * Then, the calculation returns:
   *
   *  floor(√ATK * ACI)
   *
   * @property currentValue
   * @type {number}
   * @readonly
   */
  currentValue: Ember.computed('strength', 'dexterity', 'agility',
    'accuracy', 'primaryAttackStat', 'effects.@each', function() {
    let $STR = this.get('strength.value'),
        $DEX = this.get('dexterity.value'),
        $AGI = this.get('agility.value'),
        $ACC = this.get('accuracy.value');

    let ps = this.get('primaryAttackStat.id');

    Ember.assert(ps !== null,
      'race has no primaryAttackStat defined; expected values: strength, dexterity, agility');

    let val;

    if (ps === 'strength') {
      val = [$STR, $DEX, $AGI];
    } else if (ps === 'dexterity') {
      val = [$DEX, $STR, $AGI];
    } else if (ps === 'agility') {
      val = [$AGI, $STR, $DEX];
    }

    return Math.floor(Math.sqrt(val.map(function(val, idx) {
      return Math.pow(val, 4 - idx) * 0.7;
    }).reduce(function(a, b) {
      return a + b;
    })) * (1 + $ACC * 0.1)) + this.getEffectsValue();
  })
});
