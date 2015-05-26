import Ember from 'ember';
import BasicMetadata from '../generics/basic-metadata';
import ItemStack from './item-stack';

/**
 * Contains information regarding how to craft
 * a certain Item.
 *
 * @class Recipe
 * @extends {Ember.Object}
 * @uses BasicMetadata
 */
export default Ember.Object.extend(BasicMetadata, {

  /**
   * Contains a list of all ingredients required for
   * crafting the recipe.
   * It can be an array of ItemStack instances or a
   * string list:
   *
   * ```javascript
   * // Recipe with ItemStacks as ingredients. Items can be
   * // either generic Item instances or Item-derived objects.
   * export default Recipe.extend({
   *   ...
   *   ingredients: Ember.computed(function() {
   *     return [
   *       ItemStack.create({
   *         item: Item.create({ id: 'leather' }),
   *         stackSize: 10
   *       }),
   *       ItemStack.create({
   *         item: GoldenKeyItem.create(),
   *         stackSize: 1
   *       })
   *       ItemStack.create({
   *         item: Item.create({ id: 'red_rose' }),
   *         stackSize: 2,
   *         isOptionalForCraft: true
   *       })
   *     ]
   *   }),
   *   ...
   * })
   *
   * // Recipe with string list as ingredients.
   * export default Recipe.extend({
   *   ...
   *   ingredients: Ember.computed(function() {
   *     return [
   *       'leather#10',
   *       'redRose#2?'  // This is an optional ingredient.
   *     ]
   *   })
   *   ...
   * })
   * ```
   *
   * @property ingredients
   * @type {ItemStack[]|string}
   */
  ingredients: Ember.computed(function() { return Ember.A(); }),

  /**
   * Contains a callback to craft the item once all required
   * ingredients are available in the owner's inventory.
   * Function must return an ItemStack or Item instance.
   * The function's scope is the Recipe instance.
   *
   * ```javascript
   * import Item from 'xethya/utils/item';
   * import Recipe from 'xethya/utils/recipe';
   *
   * export default Recipe.extend({
   *   ingredients: Ember.computed(function() {
   *     return ['']
   *   })
   * });
   * ```
   *
   * @property itemGenerator
   * @type {Function}
   */
  itemGenerator: Ember.computed(function() { return null; }),

  /**
   * Triggers when the item generator is set.
   *
   * @event itemGeneratorChanged
   */
  itemGeneratorChanged: Ember.observer('itemGenerator', function() {
    Ember.assert(
      typeof this.get('itemToCraft') === 'function',
      'recipe.itemToCraft must be a Function returning an ItemStack or an Item'
    );
  }),

  /**
   * Initializes the recipe. If the ingredients list is
   * made of strings, it'll convert it to a list of
   * ItemStack instances.
   *
   * @method init
   */
  init: function() {
    let _this = this;
    this._super();
    this.get('ingredients').forEach(function(ingredient, idx) {
      let itemID, stackSize, stackInfo, isOptionalForCraft;
      if (typeof ingredient === 'string') {
        stackInfo = ingredient.split('#');
        itemID = stackInfo[0];
        stackSize = stackInfo[1].replace('?', '');
        isOptionalForCraft = stackInfo[1].substr(-1) === '?';
        _this.set('ingredients.' + idx, ItemStack.create({
          item: _this.get(itemID + 'ItemFactory').create(),
          stackSize: stackSize,
          isOptionalForCraft: isOptionalForCraft
        }));
      }
    });
  },

  /**
   * Crafts the item and gives it to the recipe owner.
   *
   * @param  {Equipper} owner
   * @return {ItemStack|Item}
   */
  craft: function(owner) {
    let recipeIngredients = this.get('ingredients');

    if (!owner.get('isEquipper')) {
      throw new Error('INVALID_CRAFT_OPERATION');
    }

    if (owner.get('inventory').every(function(ingredient) {
      return recipeIngredients.findBy('id', ingredient.get('id')) !== null;
    })) {
      owner.pickUpObject(this.get('itemGenerator').call(this, owner));
      recipeIngredients.forEach(function(ingredient) {
        owner.dropObject(ingredient);
      });
    }
  }

});
