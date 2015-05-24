import Ember from 'ember';
import BasicMetadata from '../core/basic-metadata';
import Gradeable from '../core/gradeable';
import random from '../wrappers/random';

/**
 * Defines an object that can modify the values of a
 * {Stat} or a {Skill}.
 *
 * @class Effect
 * @extends {Ember.Object}
 * @uses BasicMetadata
 * @uses Gradeable
 */
export default Ember.Object.extend(BasicMetadata, Gradeable, {
  _type: Ember.computed(function() {
    return 'Effect';
  }),

  /**
   * Defines the value of the effect.
   *
   * @property value
   * @type {number|boolean}
   */
  value: null,

  /**
   * Triggers when the value is modified.
   *
   * @event valueChanged
   */
  valueChanged: Ember.observer('value', function() {
    if (this.get('isNumeric')) {
      Ember.assert(!isNaN(this.get('value')),
        'effect.value must be a number due to effect.isNumeric === true');
    } else {
      Ember.assert(this.get('value') === true || this.get('value') === false,
        'effect.value must be a boolean due to effect.isNumeric === false');
    }
  }),

  /**
   * Defines if the effect works with numeric (true) or boolean (false) values.
   *
   * @property isNumeric
   * @type {boolean}
   */
  isNumeric: null,

  /**
   * Triggers when the 'isNumeric' property is modified.
   *
   * @event isNumericChanged
   */
  isNumericChanged: Ember.observer('isNumeric', function() {
    Ember.assert(this.get('isNumeric') === true || this.get('isNumeric') === false,
      'effect.isNumeric must be a boolean');
  }),

  /**
   * Sets the skills and/or stats to be affected by this effect.
   *
   * @property affects
   * @type {object[]}
   */
  affects: Ember.computed(function() { return Ember.A(); }),

  /**
   * Triggers when the content of 'affects' is modified.
   *
   * @event affectsChanged
   */
  affectsChanged: Ember.observer('affects.@each', function() {
    /* Ember.assert(this.get('affects').every(function(affected) {
      return ['Skill', 'Stat'].contains(affected.get('_type'));
    }), 'effect.affectsChanged: affects must contain instances of Skill or Stat'); */
  }),

  /**
   * Determines if the effect can occur multiple times
   * on the same entity or not.
   *
   * @property canStack
   * @type {boolean}
   * @default false
   */
  canStack: false,

  /**
   * Sets the effect's duration, in seconds. If set to 0, effect must be
   * manually removed.
   *
   * @property duration
   * @type {Number}
   */
  duration: 0,

  /**
   * Handles the Ember.run.later call for the duration property.
   *
   * @property _durationRunLaterCallback
   * @type {object}
   * @private
   */
  _durationRunLaterCallback: null,

  /**
   * Unique ID for the effect instance. Used for deleting a specific
   * instance of the effect, when dealing with stackable effects.
   *
   * @property _uuid
   * @type {string}
   * @private
   */
  _uuid: null,

  /**
   * Determines if the effect can auto-increase itself automatically.
   * Used in conjunction with 'autoIncreaseInterval' to determine
   * the increment's pace.
   *
   * @property canAutoIncrease
   * @type {Boolean}
   */
  canAutoIncrease: false,

  /**
   * Determines the interval in seconds for auto-increment
   * the effect's value.
   *
   * @property autoIncreaseInterval
   * @type {Number}
   */
  autoIncreaseInterval: 0,

  /**
   * Determines how the auto-increment is executed for this effect.
   * If no function is specified, no auto-increment will occur.
   * The scope of the function is the Effect instance.
   * This callback must return a positive number to increase the
   * effect's value or a negative number to decrease it.
   *
   * ```javascript
   *    // Duplicates the effect.
   *    autoIncreaseCallback: function(value) { return value; }
   *
   *    // Negates the effect.
   *    autoIncreaseCallback: function(value) { return -value; }
   * ```
   * @method autoIncreaseCallback
   */
  autoIncreaseCallback: null,

  /**
   * Runs every [autoIncreaseInterval] seconds the [autoIncreaseCallback].
   *
   * @method _handleAutoIncrease
   * @private
   */
  _handleAutoIncrease: function() {
    if (!this.get('canAutoIncrease') && this.get('autoIncreaseInterval') === 0) { return; }

    let _this = this;
    _this.incrementProperty('value', _this.autoIncreaseCallback.call(_this, _this.get('value')));
    _this._afterAutoIncrease();

    this.set('_autoIncreaseRunLaterCallback', Ember.run.later(function() {
      _this._handleAutoIncrease();
    }, this.get('autoIncreaseInterval') * 1000));
  },

  _afterAutoIncrease: null,

  /**
   * Stores the Ember.run.later handler for the [autoIncreaseCallback] function.
   *
   * @property _autoIncreaseRunLaterCallback
   * @type {object}
   */
  _autoIncreaseRunLaterCallback: null,

  /**
   * Sets an unique ID for this Effect instance.
   *
   * @method init
   */
  init: function() {
    this._super();

    let mt = random().engines.mt19937();
    mt.autoSeed();
    this.set('_uuid', random().uuid4(mt));
  }
});
