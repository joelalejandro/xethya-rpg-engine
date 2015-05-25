import Ember from 'ember';

export default Ember.Mixin.create({
  isConditioned: Ember.computed(function() { return true; }),

  conditions: Ember.computed(function() { return Ember.A(); }),

  _parseCondition: function(condition) {
    /*
    stat:strength = 4
    stat:strength >= 4
    attr:level >= 1
    skill:attack >= 100

    prefixes: stat, attr, skill
    operators: =, >=, >, <=, <
     */
    let metadata = condition.split(' ');
    let entity = metadata[0].split(':');
    let prefix = entity[0];
    let subject = entity[1];
    let operator = metadata[1];
    let expectedComparisonResults = {
      '=': [0],
      '>=': [1, 0],
      '>': [1],
      '<': [-1],
      '<=': [-1, 0],
      '!=': [-1, 1]
    };
    let expectedValueGetter = {
      'stat': 'value',
      'skill': 'currentValue'
    };
    let comparisonValue = metadata[2];
    let result = null;
    let isStat = prefix === 'stat' && this.get('hasStats');
    let isSkill = prefix === 'skill' && this.get('hasSkills');
    if (isStat || isSkill) {
      result = Ember.compare(
        this.get[Ember.string.capitalize(prefix)](subject)
            .get(['value', 'currentValue'][expectedValueGetter]), comparisonValue);
    } else if (prefix === 'attr' && this.get(subject)) {
      result = Ember.compare(this.get(subject), comparisonValue);
    }

    return expectedComparisonResults[operator].indexOf(result) > -1;
  },

  areConditionsMet: function() {
    let _this = this;
    return this.get('conditions')
               .map(function(condition) {
                  _this._parseCondition.call(_this, condition);
                })
               .concat([true, true])
               .reduce(function(a, b) { return a && b; });
  }
});
