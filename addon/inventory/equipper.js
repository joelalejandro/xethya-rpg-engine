import Ember from 'ember';
import Wallet from './wallet';
import ItemStack from './item-stack';
import MUGRE from '..misc/filthy-stuff';

/**
 * Implements capabilities of handling an inventory of
 * items and a wallet for managing money.
 *
 * @class Equipper
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property isEquipper
   * @type {boolean}
   * @default true
   */
  isEquipper: Ember.computed(function() { return true; }),

  /**
   * Stores all items in possession of an entity.
   *
   * @property inventory
   * @type {Item[]}
   */
  inventory: Ember.computed(function() {
    return Ember.A();
  }),

  /**
   * Stores all money that an entity carries.
   *
   * @property wallet
   * @type {Wallet}
   */
  wallet: Ember.computed(function() {
    return Wallet.create({});
  }),

  /**
   * Returns the total weight of all objects stored
   * in inventory.
   *
   * @property carriedWeight
   * @type {number}
   */
  carriedWeight: Ember.computed('inventory.@each', function() {
    return this.get('inventory').map(function(obj) {
      return obj.get('weight');
    }).concat([0, 0]).reduce(function(w1, w2) {
      return w1 + w2;
    });
  }),

  /**
   * Checks if the entity can load the weight.
   *
   * @param  {Item|ItemStack} obj
   * @return {Boolean}
   */
  canPutUpWeight: function(obj) {
    let $CRW = this.get('carryableWeight');
    let futureWeight = this.get('carriedWeight') + obj.get('weight');
    return futureWeight <= $CRW.getAffectedValue();
  },

  /**
   * Triggers when the inventory contents are modified.
   * Checks that the weight in the inventory doesn't
   * exceeds the carryable weight limit.
   *
   * @event inventoryChanged
   */
  inventoryChanged: Ember.observer('inventory.@each', function() {
    let $CRW = this.get('carryableWeight');
    if ($CRW !== null) {
      if (this.get('carriedWeight') > $CRW.getAffectedValue()) {
        throw new Error("INVENTORY_EXCEEDS_WEIGHT");
      }
    }
  }),

  /**
   * Runs a loop across all objects registered in the
   * inventory, allowing to call a function when an
   * item match occurs.
   *
   * If {item} is given a string with an item id
   * that begins with 'stack:', the promise will
   * receive an ItemStack instance; otherwise,
   * it'll receive an Item instance.
   *
   * @method _iterateInventory
   * @param {string|Item|ItemStack} item
   * @param {function} callbackFound
   * @param {function} callbackNotFound
   * @private
   */

  _iterateInventory: function(item, callbackFound, callbackNotFound) {
    let inventory = this.get('inventory');
    let itemType;
    let getStack = false;

    if (typeof item === 'string') {
      getStack = item.indexOf('stack:') === 0;
      itemType = item;
    } else if (item.get('_type')) {
      itemType = item.get('_type');
    }

    let match = false;
    for (let idx = 0; idx < inventory.get('length'); idx++) {
      let i = inventory[idx];
      if (i.get('_type') === 'ItemStack') {
        if (i.get('item.id') === (item.get('item') ? item.get('item.id') : item.get('id'))) {
          match = true;
          callbackFound(getStack ? i : i.get('item'));
          break;
        }
      } else if (i.get('id') === item.get('id')) {
        match = true;
        callbackFound(i);
        break;
      }
    }

    if (!match && callbackNotFound) { callbackNotFound(item); }
  },

  /**
   * Picks up an item from the world, if such item
   * can be looted.
   *
   * @method pickUpObject
   * @param {Item|ItemStack} obj
   */
  pickUpObject: function(obj) {
    Ember.assert(['ItemStack', 'Item'].indexOf(obj.get('_type')) > -1,
      'equipper.pickUpObject: obj must be an Item or an ItemStack instance');

    if (!this.canPutUpWeight(obj)) {
      throw new Error('INVENTORY_EXCEEDS_WEIGHT');
    };

    if (obj.get('_type') === 'ItemStack') {
      if (obj.get('item._type') === 'ItemMoney') {
        this.get('wallet').credit(obj.get('stackSize'));
      } else if (obj.get('item.isLootable')) {
        obj.get('item').set('owner', this);
        if (this.hasObjectInInventory(obj)) {
          let firstStack = this.get('inventory').find(function(content) {
            return content.get('_type') === 'ItemStack' &&
                content.get('item.id') === obj.get('item.id');
          });
          if (firstStack) {
            let newStackSize = firstStack.get('stackSize') + obj.get('stackSize');
            if (newStackSize > obj.get('item.maxStackSize')) {
              let stack1Size = Math.abs(obj.get('item.maxStackSize') - firstStack.get('stackSize'));
              let stack2Size = Math.abs(obj.get('item.maxStackSize') - newStackSize);
              firstStack.incrementProperty('stackSize', stack1Size);

              let newStack = ItemStack.create({
                item: firstStack.get('item'),
                stackSize: stack2Size
              });
              this.get('inventory').pushObject(newStack);
            } else {
              firstStack.incrementProperty('stackSize', obj.get('stackSize'));
            }
          }
        } else {
          this.get('inventory').pushObject(obj);
        }
      }
    } else if (obj.get('isLootable')) {
      obj.set('owner', this);
      if (this.hasObjectInInventory(obj)) {
        let firstStack = this.get('inventory').find(function(content) {
          return content.get('_type') === 'ItemStack' &&
              content.get('item.id') === obj.get('id');
        });
        let firstItem = this.get('inventory').find(function(content) {
          return content.get('_type') === 'Item' &&
              content.get('id') === obj.get('id');
        });
        if (firstStack && obj.get('isStackable')) {
          firstStack.incrementProperty('stackSize');
        } else if (firstItem && obj.get('isStackable')) {
          let newStack = ItemStack.create({ item: obj, stackSize: 2 });
          this.dropObject(obj, 1);
          this.get('inventory').pushObject(newStack);
        } else {
          this.get('inventory').pushObject(obj);
        }
      } else {
        this.get('inventory').pushObject(obj);
      }
    }

    MUGRE.recalculateWeight(this);
  },

  /**
   * Drops an object from the inventory.
   *
   * @method dropObject
   * @param {Item} item
   * @param {number} amount
   */
  dropObject: function(item, amount) {
    Ember.assert(['ItemStack', 'Item'].indexOf(item.get('_type')) > -1,
      'equipper.dropObject: item must be an Item or an ItemStack instance');

    if (amount !== undefined) {
      Ember.assert(!isNaN(amount),
        'equipper.dropObject: amount must be a number');
      Ember.assert(amount > 0,
        'equipper.dropObject: amount must be > 0');
    }

    if (item.get('_type') === 'ItemMoney') {
      this.get('wallet').debit(amount);
    } else {
      let inventory = this.get('inventory');
      let dropped = false;
      inventory.forEach(function(content) {
        if (dropped) return;

        if (content.get('_type') === 'ItemStack' &&
            content.get('item.id') === item.get('id') &&
            content.get('stackSize') >= amount) {
          content.decrementProperty('stackSize', amount);
          dropped = true;
          if (content.get('stackSize') === 0) {
            content.set('_markedForDrop', true);
          }
        } else if (content.get('id') === item.get('id')) {
          content.set('_markedForDrop', true);
          dropped = true;
        }
      });
      this.set('inventory', inventory.rejectBy('_markedForDrop', true));
    }

    MUGRE.recalculateWeight(this);
  },

  /**
   * Determines whether an item exists in the entity's
   * inventory.
   *
   * @method hasObjectInInventory
   * @param {Item|ItemStack} item
   * @return {boolean}
   */
  hasObjectInInventory: function(item) {
    Ember.assert(['ItemStack', 'Item'].indexOf(item.get('_type')) > -1,
      'equipper.hasObjectInInventory: item must be an Item or an ItemStack instance');

    let found = false;
    this._iterateInventory(item, function() { found = true; });

    return found;
  },

  /**
   * Gives the object to another entity who has inventory.
   *
   * @method giveObject
   * @param {Item|ItemStack} object
   * @param {Equipper} newEquipper
   */
  giveObject: function(object, newEquipper) {
    Ember.assert(['ItemStack', 'Item'].indexOf(object.get('_type')) > -1,
      'equipper.giveObject: object must be an Item or an ItemStack instance');

    Ember.assert(newEquipper.get('isEquipper'),
      'equipper.giveObject: newEquipper must apply the Equipper mixin');

    this.dropObject(object, 1);
    newEquipper.pickUpObject(object);
  },

  /**
   * Receives an object from another entity with inventory.
   *
   * @method receiveObject
   * @param {Item|ItemStack} object
   * @param {Equipper} oldEquipper
   */
  receiveObject: function(object, oldEquipper) {
    Ember.assert(['ItemStack', 'Item'].indexOf(object.get('_type')) > -1,
      'equipper.receiveObject: object must be an Item or an ItemStack instance');

    Ember.assert(oldEquipper.get('isEquipper'),
      'equipper.receiveObject: oldEquipper must apply the Equipper mixin');

    oldEquipper.dropObject(object, 1);
    this.pickUpObject(object);
  },

  /**
   * Selects an item from the inventory.
   *
   * @method getItem
   * @param {string} itemId
   * @return {Item}
   */
  getItem: function(itemId) {
    Ember.assert(typeof itemId === 'string',
      'equipper.getItem: itemId must be a string');

    let foundItem;
    this._iterateInventory(itemId, function(i) { foundItem = i; });

    return foundItem;
  },

  /**
   * Selects an item stack from the inventory.
   *
   * @method getItemStack
   * @param {string} itemId
   * @return {ItemStack}
   */
  getItemStack: function(itemId) {
    Ember.assert(typeof itemId === 'string',
      'equipper.getItemStack: itemId must be a string');

    let foundStack;
    this._iterateInventory('stack:' + itemId, function(i) { foundStack = i; });

    return foundStack;
  }

});
