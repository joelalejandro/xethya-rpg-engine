import Ember from 'ember';

/**
 * Implements a property for defining a living entity's gender.
 *
 * @class Genderable
 * @namespace Gender
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property hasGender
   * @type {boolean}
   * @default true
   */
  hasGender: Ember.computed(function() { return true; }),

  /**
   * Defines the living entity's gender.
   *
   * @property gender
   * @type {Gender}
   */
  gender: null,

  /**
   * Contains a list of all possible genders this living entity can have.
   *
   * @property possibleGenders
   * @type {Gender[]}
   */
  possibleGenders: Ember.computed(function() { return Ember.A(); }),

  /**
   * Triggers when the gender is set.
   *
   * @event genderChanged
   */
  genderChanged: Ember.observer('gender', function() {
    Ember.assert(this.get('possibleGenders').findBy('id', this.get('gender.id')) !== null,
      'genderable.gender must be in genderable.possibleGenders');
  })
});
