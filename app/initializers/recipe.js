import Recipe from 'xtrpg/craft/recipe';

export function initialize(container, application) {
  application.register('recipe:main', Recipe, { instantiate: false });
  application.inject('component', 'recipeFactory', 'recipe:main');
}

export default {
  name: 'recipe',
  initialize: initialize
};
