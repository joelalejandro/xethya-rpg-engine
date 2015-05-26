import Ember from 'ember';

/**
 * Represents a stack of items of the same type.
 *
 * @class ItemStack
 * @namespace Items
 * @extends {Ember.Object}
 */
export default Ember.Object.extend({
  _type: Ember.computed(function() {
    return 'ItemStack';
  }),

  /**
   * Sets the item that conforms this stack.
   *
   * @property item
   * @type {Item}
   */
  item: null,

  /**
   * Triggers when the item is changed.
   *
   * @event itemChanged
   */
  itemChanged: Ember.observer('item', function() {
    Ember.assert(this.get('item._type') === 'Item',
      'itemStack.item must be an instance of Item');
    Ember.assert(this.get('item.isStackable'),
      'itemStack.item.isStackable must be set to true');
  }),

  /**
   * Sets the size of the stack.
   *
   * @property stackSize
   * @type {number}
   */
  stackSize: 0,

  /**
   * Determines if an item is being dropped.
   *
   * @property _markedForDrop
   * @type boolean
   * @private
   */
  _markedForDrop: false,

  /**
   * Triggers when the stack is modified.
   *
   * @event stackSizeChanged
   */
  stackSizeChanged: Ember.observer('stackSize', function() {
    Ember.assert(!isNaN(this.get('stackSize')),
      'itemStack.stackSize must be a number');
    Ember.assert(this.get('stackSize') > 0,
      'itemStack.stackSize must be larger than zero');
    Ember.assert(this.get('stackSize') <= this.get('item.maxStackSize'),
      'itemStack.stackSize must be smaller than item.maxStackSize');
  }),

  /**
   * Returns the weight of the whole stack.
   *
   * @property weight
   * @return {Number}
   */
  weight: Ember.computed('item', 'stackSize', function() {
    return this.get('item.weight') * this.get('stackSize');
  }),

  /**
   * Determines if the stack, as an ingredient, is optional
   * when crafting a recipe.
   *
   * @property isOptionalForCraft
   * @type {Boolean}
   */
  isOptionalForCraft: false
});
