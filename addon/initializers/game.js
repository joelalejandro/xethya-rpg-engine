import Game from '../core/game';

export function initialize(container, application) {
  application.register('game:main', Game, { instantiate: true });
  application.inject('controller', 'game', 'game:main');
  application.inject('route', 'game', 'game:main');
  application.inject('component', 'game', 'game:main');
}

export default {
  name: 'game',
  initialize: initialize
};
