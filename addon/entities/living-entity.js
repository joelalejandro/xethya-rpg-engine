import Ember from 'ember';

import MUGRE from '../misc/filthy-stuff';

import Entity from './entity';
import Raceable from '../races/raceable';
import Statable from '../stats/statable';
import Skillable from '../skills/skillable';
import Levelable from '../leveling/levelable';
import Ageable from '../generics/ageable';
import Nameable from '../generics/nameable';
import Genderable from '../gender/genderable';
import Equipper from '../inventory/equipper';
import Wearer from '../inventory/wearer';
import Traitable from '../personality/traitable';

import StatStrength from '../presets/stats/strength';
import StatAgility from '../presets/stats/agility';
import StatConstitution from '../presets/stats/constitution';
import StatDexterity from '../presets/stats/dexterity';
import StatIntelligence from '../presets/stats/intelligence';
import StatSpirit from '../presets/stats/spirit';
import StatStamina from '../presets/stats/stamina';
import StatAccuracy from '../presets/stats/accuracy';
import StatCarryableWeight from '../presets/stats/carryable-weight';
import StatSize from '../presets/stats/size';
import StatWeight from '../presets/stats/weight';
import StatHeight from '../presets/stats/height';

import SkillAttack from '../presets/skills/attack';
import SkillDodge from '../presets/skills/dodge';

/**
 * Defines a living entity for the game.
 * This is the base class for creatures, non-playable and playable
 * characters and such.
 *
 * @class LivingEntity
 * @namespace Entities
 * @extends {Entity}
 * @uses Raceable
 * @uses Statable
 * @uses Skillable
 * @uses Levelable
 * @uses Ageable
 * @uses Nameable
 * @uses Genderable
 * @uses Equipper
 * @uses Wearer
 * @uses Entity
 * @uses Traitable
 */
export default Entity.extend(

  Raceable, Statable, Skillable,
  Levelable, Ageable, Nameable, Genderable,
  Equipper, Wearer, Traitable,

  {
    _type: Ember.computed(function() {
      return 'LivingEntity';
    }),

    /**
     * @property strength
     * @type {StatStrength}
     */
    strength: Ember.computed('stats.@each', function() {
      return this.getStat('strength');
    }),

    /**
     * @property agility
     * @type {StatAgility}
     */
    agility: Ember.computed('stats.@each', function() {
      return this.getStat('agility');
    }),

    /**
     * @property constitution
     * @type {StatConstitution}
     */
    constitution: Ember.computed('stats.@each', function() {
      return this.getStat('constitution');
    }),

    /**
     * @property dexterity
     * @type {StatDexterity}
     */
    dexterity: Ember.computed('stats.@each', function() {
      return this.getStat('dexterity');
    }),

    /**
     * @property intelligence
     * @type {StatIntelligence}
     */
    intelligence: Ember.computed('stats.@each', function() {
      return this.getStat('intelligence');
    }),

    /**
     * @property spirit
     * @type {StatSpirit}
     */
    spirit: Ember.computed('stats.@each', function() {
      return this.getStat('spirit');
    }),

    /**
     * @property stamina
     * @type {StatStamina}
     */
    stamina: Ember.computed('stats.@each', function() {
      return this.getStat('stamina');
    }),

    /**
     * @property accuracy
     * @type {StatAccuracy}
     */
    accuracy: Ember.computed('stats.@each', function() {
      return this.getStat('accuracy');
    }),

    /**
     * @property carryableWeight
     * @type {StatCarryableWeight}
     */
    carryableWeight: Ember.computed('stats.@each', function() {
      return this.getStat('carryableWeight');
    }),

    /**
     * @property size
     * @type {StatSize}
     */
    size: Ember.computed('stats.@each', function() {
      return this.getStat('size');
    }),

    /**
     * @property weight
     * @type {StatWeight}
     */
    weight: Ember.computed('stats.@each', function() {
      return this.getStat('weight');
    }),

    /**
     * @property height
     * @type {StatHeight}
     */
    height: Ember.computed('stats.@each', function() {
      return this.getStat('height');
    }),

    /**
     * @property attack
     * @type {SkillAttack}
     */
    attack: Ember.computed('skills.@each', function() {
      return this.getSkill('attack');
    }),

    /**
     * @property dodge
     * @type {SkillDodge}
     */
    dodge: Ember.computed('skills.@each', function() {
      return this.getSkill('dodge');
    }),

    /**
     * Initializes the living entity. By default, it registers
     * all basic stats, with no values. It also registers
     * all skills available.
     *
     * @method init
     */
    init: function() {
      this._super();

      // Stats registration.
      this.get('stats').pushObject(StatStrength.create());
      this.get('stats').pushObject(StatAgility.create());
      this.get('stats').pushObject(StatConstitution.create());
      this.get('stats').pushObject(StatDexterity.create());
      this.get('stats').pushObject(StatIntelligence.create());
      this.get('stats').pushObject(StatSpirit.create());
      this.get('stats').pushObject(StatStamina.create());
      this.get('stats').pushObject(StatAccuracy.create({
        dexterity: this.get('dexterity'),
        agility: this.get('agility')
      }));
      this.get('stats').pushObject(StatCarryableWeight.create({
        strength: this.get('strength'),
        constitution: this.get('constitution')
      }));
      this.get('stats').pushObject(StatSize.create({
        constitution: this.get('constitution')
      }));
      this.get('stats').pushObject(StatHeight.create({
        size: this.get('size')
      }));
      this.get('stats').pushObject(StatWeight.create({
        size: this.get('size')
      }));
    },

    raceChanged: Ember.observer('race', function() {
      // Skills registration.
      this.set('skills', Ember.A());
      this.get('skills').pushObject(SkillAttack.create({
        strength: this.get('strength'),
        dexterity: this.get('dexterity'),
        agility: this.get('agility'),
        accuracy: this.get('accuracy'),
        primaryAttackStat: this.getStat(this.get('race.primaryAttackStat'))
      }));
      this.get('skills').pushObject(SkillDodge.create({
        dexterity: this.get('dexterity'),
        agility: this.get('agility'),
        weight: this.get('weight')
      }));
    }),

    /**
     * Sets a random number for the age, according to the race's
     * life expectancy.
     *
     * @method rollAge
     */
    rollAge: function() {
      this.get('dice').set('minimumValue', 1);
      this.get('dice').set('maximumValue', this.get('race.lifeExpectancy'));
      this.set('age', this.get('dice').rollOne());
      this.get('dice').reset();
    },

    /**
     * Sets values for all the stats, using a 10-sided dice.
     *
     * @method rollStats
     * @todo Replace MUGRE.syncStatsWithSkills with proper observer-based code.
     */
    rollStats: function() {
      let _this = this;
      this.get('dice').reset();
      this.get('stats').forEach(function(stat) {
        stat.set('currentValue', _this.get('dice').rollOne());
        MUGRE.syncStatsWithSkills(_this);
      });
    },

    /**
     * Defines the entity's gender, according to the probability hash
     * set in each possible gender.
     *
     * @method rollGender
     */
    rollGender: function() {
      let chance = this.get('dice').rollChance();
      this.set('gender', this.get('possibleGenders').filter(function(gender) {
        return chance <= gender.get('upperSpawnProbability') && gender.get('lowerSpawnProbability') <= chance;
      }).get('firstObject'));
      this.get('dice').reset();
    },

    /**
     * Sets a random level for the living entity, according to the spawn level
     * boundaries.
     *
     * @method rollLevel
     */
    rollLevel: function() {
      this.get('dice').set('minimumValue', this.get('lowerSpawnLevel'));
      this.get('dice').set('maximumValue', this.get('upperSpawnLevel'));
      this.set('level', this.get('dice').rollOne());
      this.get('dice').reset();
    }

  }
);
