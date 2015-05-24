import LivingEntity from 'xethya/utils/living-entity';

export function initialize(container, application) {
  application.register('living-entity:main', LivingEntity, { instantiate: false });
  application.inject('component', 'livingEntityFactory', 'living-entity:main');
}

export default {
  name: 'living-entity',
  initialize: initialize
};
