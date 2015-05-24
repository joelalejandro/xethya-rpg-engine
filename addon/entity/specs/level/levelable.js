import Ember from 'ember';

import ENV from '../../../../config/environment';

import FibonacciLevelUp from './up/fibonacci';
import MarchelLevelUp from './up/marchel';

/**
 * Implements behaviours for entities that can level up.
 *
 * @class Levelable
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property isLevelable
   * @type {boolean}
   * @default true
   */
  isLevelable: Ember.computed(function() { return true; }),

  /**
   * Defines the entity's level. Level is changed with experiencePoints.
   *
   * @property level
   * @type {number}
   */
  level: 1,

  /**
   * Triggers when the level is set.
   *
   * @event levelChanged
   */
  levelChanged: Ember.observer('level', function() {
    Ember.assert(!isNaN(this.get('level')),
      'levelable.label must be a number');
    Ember.assert(this.get('level') > 0,
      'levelable.label must be a positive number');
  }),

  /**
   * Defines the entity's current experience points. It modifies the level.
   *
   * @property experiencePoints
   * @type {number}
   */
  experiencePoints: 0,

  /**
   * Triggers when experience points are gained.
   *
   * @event experiencePointsChanged
   */
  experiencePointsChanged: Ember.observer('experiencePoints', function() {
    Ember.assert(!isNaN(this.get('experiencePoints')),
      'levelable.experiencePoints must be a number');
    Ember.assert(this.get('experiencePoints') >= 0,
      'levelable.experiencePoints must be a positive number or zero');
    if (this.get('levelUpAlgorithm').experienceRequiredForLevel(this.get('level') + 1) >= this.get('experiencePoints')) {
      this.incrementProperty('level');
    }
  }),

  /**
   * Defines the name of the algorithm to use for leveling up. Such algorithm must be
   * an {Ember.Object} with a function named 'experienceRequiredForLevel'.
   *
   * @property levelUpAlgorithmName
   * @readOnly
   * @type {string}
   */
  levelUpAlgorithmName: Ember.computed(function() { return ENV.APP.levelUpAlgorithmName; }),

  /**
   * Gets the defined level up algorithm. Such algorithm must be
   * an {Ember.Object} with a function named {experienceRequiredForLevel}.
   *
   * @property levelUpAlgorithm
   * @readOnly
   * @type {Ember.Object}
   */
  levelUpAlgorithm: Ember.computed(function() {
    let alg = null;
    switch (this.get('levelUpAlgorithmName')) {
      case 'marchel':
        alg = MarchelLevelUp.create();
        break;
      case 'fibonacci':
        alg = FibonacciLevelUp.create();
        break;
    }
    Ember.assert(alg !== null && alg !== undefined,
      'levelable.levelUpAlgorithm must be defined (no suitable algorithm detected, supported: fibonacci, marchel');
    Ember.assert(typeof alg.experienceRequiredForLevel === 'function',
      'levelable.levelUpAlgorithm must have a [experiencePointsChanged] function defined');
    return alg;
  }),

  /**
   * Defines the minimum level with which this entity will spawn in the game.
   *
   * @property lowerSpawnLevel
   * @type {number}
   */
  lowerSpawnLevel: null,

  /**
   * Triggers when the minimum spawn level for this entity is modified.
   *
   * @event lowerSpawnLevelChanged
   */
  lowerSpawnLevelChanged: Ember.observer('lowerSpawnLevel', function() {
    Ember.assert(!isNaN(this.get('lowerSpawnLevel')),
      'levelable.lowerSpawnLevel must be a number');
    Ember.assert(this.get('lowerSpawnLevel') > 0,
      'levelable.lowerSpawnLevel must be a positive number');
  }),

  /**
   * Defines the maximun level with which this entity will spawn in the game.
   *
   * @property upperSpawnLevel
   * @type {number}
   */
  upperSpawnLevel: null,

  /**
   * Triggers when the maximun spawn level for this entity is modified.
   *
   * @event upperSpawnLevelChanged
   */
  upperSpawnLevelChanged: Ember.observer('upperSpawnLevel', function() {
    Ember.assert(!isNaN(this.get('upperSpawnLevel')),
      'levelable.upperSpawnLevel must be a number');
    Ember.assert(this.get('upperSpawnLevel') > 0,
      'levelable.upperSpawnLevel must be a positive number');
  })
});
