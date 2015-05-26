import Ember from 'ember';
import XtrpgConfiguration from '../configuration';

export function initialize(/* container, application */) {
  Ember.libraries.register('xtrpg / Xethya RPG Engine',
    XtrpgConfiguration.version);
}

export default {
  name: 'xtrpg',
  initialize: initialize
};
