import Ember from 'ember';

/**
 * Inserts basic properties such as identifiers to
 * any object.
 *
 * @class BasicMetadata
 * @namespace Generics
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property hasBasicMetadata
   * @type {boolean}
   * @default true
   */
  hasBasicMetadata: Ember.computed(function() { return true; }),

  /**
   * Sets the object's identifier.
   *
   * @property id
   * @type {string}
   */
  id: null,

  /**
   * Triggers when the identifier is modified.
   *
   * @event idChanged
   */
  idChanged: Ember.observer('id', function() {
    Ember.assert(typeof this.get('id') === 'string',
      'basicMetadata.id must be a string');
  }),

  /**
   * Sets the object's name.
   *
   * @property name
   * @type {string}
   */
  name: null,

  /**
   * Triggers when the name is modified.
   *
   * @event nameChanged
   */
  nameChanged: Ember.computed('name', function() {
    Ember.assert(typeof this.get('name') === 'string',
      'basicMetadata.name must be a string');
  }),

  /**
   * Sets the object's description.
   *
   * @property description
   * @type {string}
   */
  description: null,

  /**
   * Triggers when the description is changed.
   *
   * @event descriptionChanged
   */
  descriptionChanged: Ember.observer('description', function() {
    Ember.assert(typeof this.get('description') === 'string',
      'basicMetadata.description must be a string');
  })
});
