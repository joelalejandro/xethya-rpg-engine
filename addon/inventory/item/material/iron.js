import Ember from 'ember';
import ItemMaterial from 'xethya/utils/item/material';
import EffectSharpness from 'xethya/utils/effect/sharpness';
import EffectWounding from 'xethya/utils/effect/wounding';

/**
 * Defines how Iron works.
 *
 * @class ItemMaterialIron
 * @extends {ItemMaterial}
 */
export default ItemMaterial.extend({

  materialType: Ember.computed(function() { return 'Iron'; }),

  /**
   * Iron has two effects: Sharpness and Wounding.
   *
   * Sharpness will have a level of 1/4th the grade of the material.
   * If Iron is of a higher grade than 3, an effect of Wounding is
   * added, according to this scale:
   *
   * Grades 4-6: Wounding 1
   * Grades 7-8: Wounding 2
   * Grades 9-10: Wounding 3
   *
   * @property effects
   * @return {Effect[]}
   */
  effects: Ember.computed(function() {
    let effects = Ember.A();

    effects.pushObject(EffectSharpness.create({ 
      grade: Math.floor(this.get('grade') / 4) 
    }));

    if (this.get('grade') > 3) {
      effects.pushObject(EffectWounding.create({ 
        grade: [1, 1, 1, 2, 2, 3, 3][this.get('grade') - 4] 
      }));
    }

    return effects;
  }),

  minimumGrade: Ember.computed(function() {
    return 1;
  }),

  maximumGrade: Ember.computed(function() {
    return 10;
  })

});
