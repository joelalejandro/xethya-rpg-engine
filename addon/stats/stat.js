import Ember from 'ember';
import Effectable from '../effectable';
import BasicMetadata from '../../core/basic-metadata';

/**
 * Defines a stat for an entity. A stat can be modified
 * through Effect objects.
 *
 * @class Stat
 * @namespace Stats
 * @extends {Ember.Object}
 * @uses Effectable
 * @uses BasicMetadata
 */
export default Ember.Object.extend(Effectable, BasicMetadata, {
  _type: Ember.computed(function() {
    return 'Stat';
  }),

  /**
   * Sets the stat's short name (i.e. Strength is short-named as STR).
   *
   * @property name
   * @type {string}
   */
  shortName: null,

  /**
   * Triggers when the short name is modified.
   *
   * @event nameChanged
   */
  shortNameChanged: Ember.observer('shortName', function() {
    Ember.assert(typeof this.get('shortName') === 'string',
      'stat.shortName must be a string');
  }),

  /**
   * Defines the minimum number that can be set in the stat.
   *
   * @property minimumValue
   * @type {number}
   */
  minimumValue: null,

  /**
   * Triggers when the minimum value is modified.
   *
   * @event minimumValueChanged
   */
  minimumValueChanged: Ember.observer('minimumValue', function() {
    Ember.assert(!isNaN(this.get('minimumValue')),
      'stat.minimumValue must be a number');
    if (this.get('currentValue') === null) {
      this.set('currentValue', this.get('minimumValue'));
    }
  }),

  /**
   * Defines the maximum number that can be set in the stat.
   *
   * @property maximumValue
   * @type {number}
   */
  maximumValue: null,

  /**
   * Triggers when the maximum value is modified.
   *
   * @event maximumValueChanged
   */
  maximumValueChanged: Ember.observer('maximumValue', function() {
    Ember.assert(!isNaN(this.get('maximumValue')),
      'stat.maximumValue must be a number');
  }),

  /**
   * Defines the current value of this stat.
   *
   * @property currentValue
   * @type {number}
   */
  currentValue: null,

  /**
   * Triggers when the current value is modified.
   *
   * @event currentValueChanged
   */
  currentValueChanged: Ember.observer('currentValue', function() {
    let cv = this.get('currentValue');
    Ember.assert(!isNaN(cv), 'stat.currentValue must be a number');
    Ember.assert(this.get('minimumValue') <= cv, 'stat.currentValue must be >= stat.minimumValue');
    Ember.assert(cv <= this.get('maximumValue'), 'stat.currentValue must be <= stat.maximumValue');
  }),

  /**
   * Returns the stat's current value, unmodified by effects.
   *
   * @method getRawValue
   * @return {number}
   */
  getRawValue: function() {
    return this.get('currentValue');
  },

  /**
   * Returns the stat's current value, modified by effects.
   *
   * @method getAffectedValue
   * @return {number}
   */
  getAffectedValue: function() {
    return this.getRawValue() + this.getEffectsValue();
  },

  /**
   * Returns the stat's current value, modified by effects.
   * This property is used as a shortcut for getAffectedValue()
   */
  value: Ember.computed('currentValue', 'effects.@each', function() {
    return this.getAffectedValue();
  })
});
