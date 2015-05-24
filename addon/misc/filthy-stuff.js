import Ember from 'ember';

/**
 * Everything that's wrong with Xethya's base code goes here.
 * The goal of the class is to disappear, one day.
 *
 * @class MUGRE
 * @static
 */
export default Ember.Object.create({
  /**
   * Forces skill value recalculation when a depending
   * stat is modified.
   *
   * @method syncStatsWithSkills
   * @param  {LivingEntity}
   */
  syncStatsWithSkills: function(livingEntity) {
    livingEntity.get('skills').forEach(function(skill) {
      skill.notifyPropertyChange('currentValue');
    });
  },

  /**
   * Forces a skill or stat value recalculation when
   * an effect is auto-incresing.
   *
   * @method syncWithEffects
   * @param  {Skill|Stat} targetObject
   */
  syncWithEffects: function(targetObject) {
    if (targetObject.get('_type') === 'Skill') {
      targetObject.notifyPropertyChange('currentValue');
    } else if (targetObject.get('_type') === 'Stat') {
      targetObject.notifyPropertyChange('value');
    }
  },

  /**
   * Forces to refresh carried weight.
   *
   * @method recalculateWeight
   * @param  {LivingEntity}
   */
  recalculateWeight: function(equipper) {
    equipper.notifyPropertyChange('carriedWeight');
  }
});
