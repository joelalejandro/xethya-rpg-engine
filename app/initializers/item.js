import Item from 'xtrpg/items/item';

export function initialize(container, application) {
  application.register('item:main', Item, { instantiate: false });
  application.inject('component', 'itemFactory', 'item:main');
}

export default {
  name: 'item',
  initialize: initialize
};
