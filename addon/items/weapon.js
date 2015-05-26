import Ember from 'ember';
import Item from './item';
import XtrpgConfiguration from '../configuration';
import SkillDepending from '../skills/skill-depending';
import StatDepending from '../stats/stat-depending';

/**
 * Defines the specification for a weapon.
 *
 * @class Weapon
 * @extends {Item}
 * @uses SkillDepending
 * @uses StatDepending
 */
export default Item.extend(
  SkillDepending, StatDepending,

  {
    itemType: Ember.computed(function() {
      return 'Weapon';
    }),

    /**
     * Sets the minimum damage the weapon can do.
     *
     * @property minimumDamage
     * @type {number}
     */
    minimumDamage: null,

    /**
     * Triggers when the minimum damage is changed.
     *
     * @event minimumDamageChanged
     */
    minimumDamageChanged: Ember.observer('minimumDamage', function() {
      Ember.assert(!isNaN(this.get('minimumDamage')),
        'weapon.minimumDamage must be a number');
    }),

    /**
     * Sets the maximum damage the weapon can do.
     *
     * @property maximumDamage
     * @type {number}
     */
    maximumDamage: null,

    /**
     * Triggers when the maximum damage is changed.
     *
     * @event maximumDamageChanged
     */
    maximumDamageChanged: Ember.observer('maximumDamage', function() {
      Ember.assert(!isNaN(this.get('maximumDamage')),
        'weapon.maximumDamage must be a number');
    }),

    /**
     * Sets the damage type for the weapon.
     *
     * @property damageType
     * @type {string}
     */
    damageType: null,

    /**
     * Triggers when the damage type is changed.
     * Validates the damage type setting.
     *
     * @event damageTypeChanged
     */
    damageTypeChanged: Ember.observer('damageType', function() {
      Ember.assert(XtrpgConfiguration.damageTypes.indexOf(this.get('damageType')) > -1,
        'damage.damageType must be one of these: ' + XtrpgConfiguration.damageTypes.join(', '));
    })
  }
);
