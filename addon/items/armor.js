import Ember from 'ember';
import Item from './item';
import SkillDepending from '../skills/skill-depending';
import StatDepending from '../stats/stat-depending';

/**
 * Defines the specification for a piece of armor.
 *
 * @class Armor
 * @namespace Items
 * @extends {Item}
 * @uses SkillDepending
 * @uses StatDepending
 */
export default Item.extend(
  SkillDepending, StatDepending,

  {
    itemType: Ember.computed(function() {
      return 'Armor';
    }),

    absorption: null
  }
);
