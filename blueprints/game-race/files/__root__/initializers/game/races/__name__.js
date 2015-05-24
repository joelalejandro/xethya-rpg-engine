import <%= classifiedModuleName %> from '../../../game/races/<%= dasherizedModuleName %>';

export function initialize(container, application) {
  application.register('race:<%= camelizedModuleName %>', <%= classifiedModuleName %>, { instantiate: false });
  application.inject('living-entity', '<%= camelizedModuleName %>RaceFactory', 'race:<%= camelizedModuleName %>');
}

export default {
  name: '<%= camelizedModuleName %>RaceFactory',
  initialize: initialize
};
