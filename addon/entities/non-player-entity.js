import Ember from 'ember';
import LivingEntity from './living-entity';

/**
 * Defines a non-playable character (NPC) in the game.
 *
 * @class NonPlayerEntity
 * @namespace Entities
 * @extends {LivingEntity}
 */
export default LivingEntity.extend({
  _type: Ember.computed(function() {
    return 'NonPlayerEntity';
  }),

  /**
   * Determines if the entity is playable. It will always return false.
   *
   * @property isPlayable
   * @default false
   * @readOnly
   * @type {boolean}
   */
  isPlayable: Ember.computed(function() {
    return false;
  })
});
