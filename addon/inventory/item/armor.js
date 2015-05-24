import Ember from 'ember';
import Item from '../item';
import SkillDepending from '../../entity/specs/skill-depending';
import StatDepending from '../../entity/specs/stat-depending';

/**
 * Defines the specification for a piece of armor.
 *
 * @class Armor
 * @extends {Item}
 * @uses SkillDepending
 * @uses StatDepending
 */
export default Item.extend(
  SkillDepending, StatDepending,

  {
    itemType: Ember.computed(function() {
      return 'Armor';
    })
  }
);
