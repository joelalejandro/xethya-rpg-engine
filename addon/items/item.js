import Ember from 'ember';
import Effectable from '../effects/effectable';
import BasicMetadata from '../generics/basic-metadata';
import Wearable from '../inventory/wearable';
import Gradeable from './gradeable';
import Conditioned from './conditioned';

/**
 * Defines a game item. An item can be modified
 * through Effect objects.
 *
 * @class Item
 * @namespace Items
 * @extends Ember.Object
 * @uses Effectable
 * @uses BasicMetadata
 * @uses Wearable
 * @uses Gradeable
 */
export default Ember.Object.extend(
  Effectable, BasicMetadata, Wearable, Gradeable, Conditioned,

  {
    _type: Ember.computed(function() {
      return 'Item';
    }),

    /**
     * Defines the item's type.
     *
     * @property itemType
     * @type string
     */
    itemType: Ember.computed(function() {
      return 'Generic';
    }),

    /**
     * Sets the item's weight.
     *
     * @property weight
     * @type number
     */
    weight: null,

    /**
     * Triggers when the weight is changed.
     *
     * @event weightChanged
     */
    weightChanged: Ember.observer('weight', function() {
      Ember.assert(!isNaN(this.get('weight')),
        'item.weight must be a number');
    }),

    /**
     * Defines if an item can be looted.
     *
     * @property isLooted
     * @type boolean
     * @defaults true
     */
    isLootable: true,

    /**
     * Defines if the item is stackable.
     *
     * @property isStackable
     * @type boolean
     * @defaults true
     */
    isStackable: true,

    /**
     * Determines how large can a stack of an item be.
     *
     * @property maxStackSize
     * @type number
     * @defaults 100
     */
    maxStackSize: 100,

    /**
     * Determines if an item is being dropped.
     *
     * @property _markedForDrop
     * @type boolean
     * @private
     */
    _markedForDrop: false,

    /**
     * Allows access to the item's owner.
     *
     * @property owner
     * @type Entity
     */
    owner: null,

    /**
     * Determines the materials used for constructing this item.
     *
     * @property materials
     * @type ItemMaterial[]
     */
    materials: Ember.computed(function() { return Ember.A(); }),

    /**
     * Triggers when the materials are changed.
     *
     * @event materialsChanged
     */
    materialsChanged: Ember.observer('materials.@each', function() {
      Ember.assert(this.get('materials').every(function(material) {
        return material.get('itemType') === 'ItemMaterial';
      }), 'item.materials must contain instances of ItemMaterial only');
    }),

    /**
     * Returns a list of all effects the item contains,
     * whether they're registered in the item itself
     * or in its materials.
     *
     * @property allEffects
     * @type Effect[]
     */
    allEffects: Ember.computed('effects', 'materials.@each.effects', function() {
      let effects = Ember.A();
      effects = this.get('effects');
      this.get('materials').forEach(function(material) {
        effects.pushObjects(material.get('effects'));
      });
      return effects;
    })
  }
);
