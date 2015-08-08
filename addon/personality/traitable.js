import Ember from 'ember';
import PersonalityTrait from './personality-trait';
import XtrpgConfiguration from '../configuration';
import Circumstance from '../storytelling/circumstance';
import Dice from '../dice/dice';

export default Ember.Mixin.create({
  personalityTraits: Ember.computed(function() { return Ember.A(); }),

  addPersonalityTrait: function(trait) {
    if (typeof trait === 'string') {
      let [id, polarity] = trait.split(':');
      this.get('personalityTraits').addObject(PersonalityTrait.create({
        id: id,
        traitPolarity: polarity
      }));
      return trait;
    } else if (trait.get('_type') === 'personalityTrait') {
      this.get('personalityTraits').addObject(trait);
      return trait;
    }
  },

  defineRandomPersonality: function() {
    let allTraits = XtrpgConfiguration.personalityTraits;
    let totalTraits = allTraits.defaultCount;
    let odds = Circumstance.create();
    odds.addProbabilities(allTraits.polarityDistribution);
    let selectedIndexes = Ember.A();
    var selectedIndex = 0;
    for (let traitCount = 0; traitCount < totalTraits; traitCount++) {
      let traitPolarity = odds.define().get('id');
      let dice = Dice.create({
        minimumValue: 0,
        maximumValue: allTraits[traitPolarity].length - 1
      });
      do {
        selectedIndex = dice.rollOne();
        selectedIndexes.push(selectedIndex);
      }
      while (selectedIndexes.indexOf(selectedIndex) < 0);
      this.addPersonalityTrait(allTraits[traitPolarity][selectedIndex] + ':' + traitPolarity);
    }
  }
});
