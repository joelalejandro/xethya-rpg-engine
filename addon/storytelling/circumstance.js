import Ember from 'ember';
import Dice from '../dice/dice';
import BasicMetadata from '../core/basic-metadata';

export default Ember.Object.extend(BasicMetadata, {
  probabilities: Ember.computed(function() { return Ember.A(); }),

  probabilitiesChanged: Ember.observer('probabilities.[]', function() {
    this.get('probabilities').forEach(function(probability) {
      return probability.get('_type') === 'circumstanceProbability';
    });
  }),

  define: function() {
    let dice = Dice.create();
    let chance = dice.rollChance();
    let chanceRates = this.get('probabilities').map(function(probability) {
      return probability.get('chanceRate');
    });

    Ember.assert(chanceRates.get('length') > 0,
      'circumstance.define: there must be at least one chanceRate defined');

    Ember.assert(chanceRates.reduce(function(a, b) {
      return a + b;
    }) === 1, 'circumstance.define: the sum of all chanceRates must be 1.0');

    let diceMinusRates = chanceRates.map(function(rate) {
      return Math.abs(chance - rate);
    });

    let definedIndex = diceMinusRates.indexOf(Math.min.apply(null, diceMinusRates));

    return this.get('probabilities')[definedIndex];
  }
})
