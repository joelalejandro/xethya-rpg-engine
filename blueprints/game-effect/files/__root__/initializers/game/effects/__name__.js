import <%= classifiedModuleName %> from '../../../game/effects/<%= dasherizedModuleName %>';

export function initialize(container, application) {
  application.register('effect:<%= camelizedModuleName %>', <%= classifiedModuleName %>, { instantiate: false });
}

export default {
  name: '<%= camelizedModuleName %>EffectFactory',
  initialize: initialize
};
