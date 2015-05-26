import Ember from 'ember';

/**
 * Implements a property for defining age in a living entity.
 *
 * @class Ageable
 * @namespace Generics
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property isAgeable
   * @type {boolean}
   * @default true
   */
  isAgeable: Ember.computed(function() { return true; }),

  /**
   * Defines the age of the living entity.
   *
   * @property age
   * @type {number}
   * @default null
   */
  age: null,

  /**
   * Fired when the age is modified.
   *
   * @event ageChanged
   */
  ageChanged: Ember.observer('age', function() {
    Ember.assert(!isNaN(this.get('age')),
      'ageable.age must be a number');
    Ember.assert(this.get('age') >= 0,
      'ageable.age must be zero or larger');
  })
});
