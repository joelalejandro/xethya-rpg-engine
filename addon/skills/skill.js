import Ember from 'ember';

import BasicMetadata from '../generics/basic-metadata';
import SkillDepending from './skill-depending';
import StatDepending from '../stats/stat-depending';
import Effectable from '../effects/effectable';
import DiceRoller from '../dice/dice-roller';
import Conditioned from '../items/conditioned';

import SkillDiceRoll from '../dice/rolls/skill';

/**
 * Represents the entity's ability to perform an action.
 *
 * @class Skill
 * @namespace Skills
 * @extends {Ember.Object}
 * @uses BasicMetadata
 * @uses SkillDepending
 * @uses StatDepending
 * @uses Effectable
 * @uses DiceRoller
 * @uses Conditioned
 */
export default Ember.Object.extend(
  BasicMetadata, SkillDepending, StatDepending, Effectable, DiceRoller, Conditioned,

  {
    _type: Ember.computed(function() {
      return 'Skill';
    }),

    /**
     * Sets the skill's value.
     *
     * @property currentValue
     * @type {number}
     */
    currentValue: null,

    /**
     * @event currentValueChanged
     */
    currentValueChanged: Ember.observer('currentValue', function() {
      let cv = this.get('currentValue');
      Ember.assert(!isNaN(cv), 'skill.currentValue must be a number');
    }),

    /**
     * Executes the skill. It combines an open dice roll
     * with the skill's current value. If the roll is a
     * blunder roll, the dice sum is subtracted from the
     * skill's current value.
     *
     * @method use
     * @return {SkillDiceRoll}
     */
    use: function() {
      let roll = this.get('dice').rollOpenThrow();
      let result = SkillDiceRoll.create({ diceRoll: roll });

      if (roll.get('_type') === 'OpenThrowDiceRoll') {
        result.set('skillResult',
          roll.get('rolledNumberSum') + this.get('currentValue'));
      } else if (roll.get('_type') === 'BlunderThrowDiceRoll') {
        result.set('skillResult',
          this.get('currentValue') - roll.get('rolledNumber'));
      } else {
        throw new Error('UNDEFINED_DICE_ROLL');
      }

      return result;
    }
  }
);
