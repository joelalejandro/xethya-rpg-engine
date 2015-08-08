import Ember from 'ember';
import Dice from '../dice/dice';
import BasicMetadata from '../generics/basic-metadata';
import CircumstanceProbability from './circumstance-probability';

export default Ember.Object.extend(BasicMetadata, {
  probabilities: Ember.computed(function() { return Ember.A(); }),

  probabilitiesChanged: Ember.observer('probabilities.[]', function() {
    this.get('probabilities').forEach(function(probability) {
      Ember.assert(probability.get('_type') === 'circumstanceProbability',
        'circumstance.probabilitiesChanged: expected _type circumstanceProbability, got ' + probability.get('_type'));
    });
  }),

  addProbability: function(shortSyntax) {
    Ember.assert(/^[A-Za-z_\-]*\%(0|1)\.[0-9]*$/.test(shortSyntax), 'Invalid syntax');
    let [id, rate] = shortSyntax.split('%');
    let circumstanceProbability = CircumstanceProbability.create({
      id: id,
      name: id,
      chanceRate: parseFloat(rate)
    });
    this.get('probabilities').addObject(circumstanceProbability);
    return circumstanceProbability;
  },

  addProbabilities: function(arrayOfShortSyntax) {
    let circumstance = this;
    arrayOfShortSyntax.forEach(function(shortSyntax) {
      circumstance.addProbability(shortSyntax);
    });
  },

  define: function() {
    let dice = Dice.create();
    let chance = dice.rollChance();
    let chanceRates = this.get('probabilities').map(function(probability) {
      return probability.get('chanceRate');
    });
    let areUniqueRates = chanceRates.map(function(chanceRate) {
      return chanceRates.filter(function(cr) { return cr === chanceRate; }).length === 1;
    }).reduce(function(a, b) {
      return a && b;
    });

    Ember.assert(chanceRates.length > 1,
      'circumstance.define: there must be at least two chanceRates defined');

    Ember.assert(chanceRates.reduce(function(a, b) {
      return a + b;
    }) === 1, 'circumstance.define: the sum of all chanceRates must be 1.0');

    if (areUniqueRates) {
      let diceMinusRates = chanceRates.map(function(rate) {
        return Math.abs(chance - rate);
     });

      let definedIndex = diceMinusRates.indexOf(Math.min.apply(null, diceMinusRates));

      return this.get('probabilities')[definedIndex];
    } else {
      throw new Error('circumstance.define: same-odds events are not supported yet');
    }
  }
});
