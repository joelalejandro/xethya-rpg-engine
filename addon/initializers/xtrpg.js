import Ember from 'ember';
import XtrpgConfiguration from '../core/configuration';

export function initialize(/* container, application */) {
  Ember.Libraries.register('xtrpg / Xethya RPG Engine',
    XtrpgConfiguration.version);
}

export default {
  name: 'xtrpg',
  initialize: initialize
};
