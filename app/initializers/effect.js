import Effect from 'xtrpg/effects/effect';

export function initialize(container, application) {
  application.register('effect:main', Effect, { instantiate: false });
  application.inject('component', 'effectFactory', 'effect:main');
  application.inject('item', 'effectFactory', 'effect:main');
  application.inject('living-entity', 'effectFactory', 'effect:main');
}

export default {
  name: 'effect',
  initialize: initialize
};
