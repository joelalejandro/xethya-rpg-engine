import Ember from 'ember';

/**
 * Implements properties for an entity to be named.
 *
 * @class Nameable
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines is the mixin is active.
   * 
   * @property isNameable
   * @type {boolean}
   * @default true
   */
  isNameable: Ember.computed(function() { return true; }),
  
  /**
   * Sets the entity's first name.
   *
   * @property firstName
   * @type {string}
   */
  firstName: null,

  /**
   * Triggers when the entity's first name is modified.
   *
   * @event firstNameChanged
   */
  firstNameChanged: Ember.observer('firstName', function() {
    Ember.assert(typeof this.get('firstName') === 'string',
      'nameable.firstName must be a string');
  }),

  /**
   * Sets the entity's last name.
   *
   * @property lastName
   * @type {string}
   */
  lastName: null,

  /**
   * Triggers when the entity's last name is modified.
   *
   * @event lastNameChanged
   */
  lastNameChanged: Ember.observer('lastName', function() {
    Ember.assert(typeof this.get('lastName') === 'string',
      'nameable.lastName must be a string');
  })
});
