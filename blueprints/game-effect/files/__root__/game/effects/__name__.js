import Ember from 'ember';
import Effect from '../../utils/effect';

/**
 * Represents a <%= camelizedModuleName %> effect.
 *
 * @class <%= camelizedModuleName %>
 * @extends Effect
 */
export default Effect.extend({

  id: Ember.computed(function() {
    return '<%= camelizedModuleName %>';
  }),

  name: Ember.computed(function() {
    return '<%= classifiedModuleName %>';
  }),

  isNumeric: Ember.computed(function() {
    return true;
  }),

  affects: Ember.computed(function() {
    return [ /* 'skill:...', 'stat:...' */ ];
  }),

  minimumGrade: Ember.computed(function() {
    return 1;
  }),

  maximumGrade: Ember.computed(function() {
    // Maximum effect level.
    return 10;
  }),

  value: Ember.computed(function() {
    // Formula for calculating effect modifier value.
    return 0;
  }),

  duration: Ember.computed(function() {
    // Time in seconds.
    return 0;
  })

});
