import Ember from 'ember';
import random from '../wrappers/random';

import Effectable from './effectable';
import DiceRoller from '../dice/dice-roller';

/**
 * Defines a generic entity for the game. Such entity can access
 * a dice thrower and can be affected by effects.
 *
 * @class Entity
 * @extends {Ember.Object}
 * @uses Effectable
 * @uses DiceRoller
 */
export default Ember.Object.extend(
  Effectable, DiceRoller,

  {
    _type: Ember.computed(function() {
      return 'Entity';
    }),

    /**
     * Unique ID for the Entity instance.
     *
     * @property _uuid
     * @type {string}
     * @protected
     */
    _uuid: null,

    init: function() {
      this._super();

      let mt = random().engines.mt19937();
      mt.autoSeed();
      this.set('_uuid', random().uuid4(mt));
    }
  }
);
