import Ember from 'ember';

/**
 * Allows an object to be measured in 'grades' of quality.
 *
 * @class Gradeable
 * @namespace Items
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property isGradeable
   * @type {boolean}
   * @default true
   */
  isGradeable: Ember.computed(function() { return true; }),

  /**
   * Sets the grade of the object.
   *
   * @property grade
   * @type {number}
   */
  grade: null,

  /**
   * Sets the minimum grade available for the object.
   *
   * @property minimumGrade
   * @type {number}
   * @default 0
   */
  minimumGrade: 0,

  /**
   * Triggers when the minimum grade is changed.
   *
   * @event minimumGradeChanged
   */
  minimumGradeChanged: Ember.observer('minimumGrade', function() {
    Ember.assert(!isNaN(this.get('minimumGrade')),
      'gradeable.minimumGrade must be a number');
  }),

  /**
   * Sets the maximum grade available for the object.
   *
   * @property maximumGrade
   * @type {number}
   * @default Infinity
   */
  maximumGrade: Infinity,

  /**
   * Triggers when the maximum grade is changed.
   *
   * @event maximumGradeChanged
   */
  maximumGradeChanged: Ember.observer('maximumGrade', function() {
    Ember.assert(!isNaN(this.get('maximumGrade')),
      'gradeable.maximumGrade must be a number');
  }),

  /**
   * Triggers when the grade is changed.
   *
   * @event gradeChanged
   */
  gradeChanged: Ember.observer('grade', function() {
    Ember.assert(!isNaN(this.get('grade')),
      'gradeable.grade must be a number');
    Ember.assert(this.get('grade') >= 0,
      'gradeable.grade must be zero or a positive number');
    Ember.assert(this.get('minimumGrade') <= this.get('grade') &&
      this.get('grade') <= this.get('maximumGrade'),
      'gradeable.grade must be between gradeable.minimumGrade and gradeable.maximumGrade');
  })
});
