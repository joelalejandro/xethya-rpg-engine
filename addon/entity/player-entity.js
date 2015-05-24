import Ember from 'ember';
import NonPlayerEntity from './non-player-entity';

/**
 * Defines a playable character (PC) in the game.
 *
 * @class PlayerEntity
 * @extends {LivingEntity}
 */
export default NonPlayerEntity.extend({
  _type: Ember.computed(function() {
    return 'PlayerEntity';
  }),

  /**
   * Determines if the entity is playable. It will always return true.
   *
   * @property isPlayable
   * @default true
   * @readOnly
   * @type {boolean}
   */
  isPlayable: Ember.computed(function() {
    return true;
  })
});
