import Ember from 'ember';
import Item from '../../utils/item';

/**
 * Represents a <%= camelizedModuleName %>.
 *
 * @class <%= camelizedModuleName %>
 * @extends Item
 */
export default Item.extend({

  id: Ember.computed(function() {
    return '<%= camelizedModuleName %>';
  }),

  weight: Ember.computed(function() {
    return 0.00;
  }),

  materials: Ember.computed(function() {
    var materials = Ember.A();
    // Register the item's materials here.
    return materials;
  })
});
