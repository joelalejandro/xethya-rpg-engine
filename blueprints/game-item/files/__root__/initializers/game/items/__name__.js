import <%= classifiedModuleName %> from '../../../game/items/<%= dasherizedModuleName %>';

export function initialize(container, application) {
  application.register('item:<%= camelizedModuleName %>', <%= classifiedModuleName %>, { instantiate: false });
  application.inject('recipe:main', '<%= camelizedModuleName %>ItemFactory', 'item:<%= camelizedModuleName %>');
}

export default {
  name: '<%= camelizedModuleName %>ItemFactory',
  initialize: initialize
};
