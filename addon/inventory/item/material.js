import Ember from 'ember';
import Item from '../item';
import XtrpgConfiguration from '../../../core/configuration';

/**
 * Defines a material, used for constructing items.
 *
 * @class Material
 * @extends {Item}
 */
export default Item.extend({

  // Deactivates the Wearable mixin for this class.
  isWearable: Ember.computed(function() { return false; }),

  itemType: Ember.computed(function() { return 'Material'; }),

  /**
   * Sets the type of this material.
   *
   * @property materialType
   * @type {string}
   */
  materialType: null,

  /**
   * Triggers when the material type is changed.
   * Validates its type.
   *
   * @event materialTypeChanged
   */
  materialTypeChanged: Ember.observer('materialType', function() {
    Ember.assert(XtrpgConfiguration.materialTypes.contains(this.get('materialType')),
      'material.materialType must be one of these: ' + XtrpgConfiguration.materialTypes.join(', '));
  })
});
