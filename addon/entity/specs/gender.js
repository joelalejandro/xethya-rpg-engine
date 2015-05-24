import Ember from 'ember';
import BasicMetadata from '../../core/basic-metadata';

/**
 * Represents an entity's gender.
 *
 * @class Gender
 * @extends {Ember.Object}
 * @uses BasicMetadata
 */
export default Ember.Object.extend(BasicMetadata, {
  _type: Ember.computed(function() {
    return 'Gender';
  }),

  /**
   * Defines the minimum chance for a gender to be selected by randomness.
   *
   * @property lowerSpawnProbability
   * @type {number}
   */
  lowerSpawnProbability: null,

  /**
   * Triggers when lowerSpawnProbability is modified.
   *
   * @event lowerSpawnProbabilityChanged
   */
  lowerSpawnProbabilityChanged: Ember.observer('lowerSpawnProbability', function() {
    Ember.assert(!isNaN(this.get('lowerSpawnProbability')),
      'gender.lowerSpawnProbability must be a number');
    Ember.assert(0 <= this.get('lowerSpawnProbability') && this.get('lowerSpawnProbability') <= 1,
      'gender.lowerSpawnProbability must be a percentile (between 0 and 1)');
  }),

  /**
   * Defines the maximum chance for a gender to be selected by randomness.
   *
   * @property upperSpawnProbability
   * @type {number}
   */
  upperSpawnProbability: null,

  /**
   * Triggers when upperSpawnProbability is modified.
   *
   * @event upperSpawnProbabilityChanged
   */
  upperSpawnProbabilityChanged: Ember.observer('upperSpawnProbability', function() {
    Ember.assert(!isNaN(this.get('upperSpawnProbability')),
      'gender.upperSpawnProbability must be a number');
    Ember.assert(0 <= this.get('upperSpawnProbability') && this.get('upperSpawnProbability') <= 1,
      'gender.upperSpawnProbability must be a percentile (between 0 and 1)');
  })

});
