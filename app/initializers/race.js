import Race from 'xtrpg/entity/specs/race';

export function initialize(container, application) {
  application.register('race:main', Race, { instantiate: false });
  application.inject('component', 'raceFactory', 'race:main');
}

export default {
  name: 'race',
  initialize: initialize
};
