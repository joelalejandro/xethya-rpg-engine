import Ember from 'ember';
import MUGRE from '../misc/filthy-stuff';

/**
 * Implements components so that an entity can be affected
 * by different effects. An effect can alter either a stat
 * or a skill.
 *
 * @class Effectable
 * @extends {Ember.Mixin}
 */
export default Ember.Mixin.create({
  /**
   * Determines if the mixin is active.
   *
   * @property isEffectable
   * @type {boolean}
   * @default true
   */
  isEffectable: Ember.computed(function() { return true; }),

  /**
   * Contains a collection of Effect objects that affect
   * the entity.
   *
   * @property effects
   * @type {Effect[]}
   */
  effects: Ember.computed(function() {
    return Ember.A();
  }),

  /**
   * Triggered when the collection of effects is altered.
   *
   * @event effectsChanged
   */
  effectsChanged: Ember.observer('effects.@each', function() {
    Ember.assert(this.get('effects').every(function(e) {
      return e.get('_type') === 'Effect';
    }), 'effectable.effects must contain instances of effect');
  }),

  /**
   * Sums the value of all effects registered in the collection.
   *
   * @method getEffectsValue
   * @return {Number}
   */
  getEffectsValue: function() {
    return this.get('effects')
             .filter(function(e) { return e.get('isNumeric'); })
             .map(function(e) { return e.get('value'); })
             .concat([0, 0])
             .reduce(function(e, f) { return e + f; });
  },

  /**
   * @private
   * @param  {Effect} effect
   * @param  {string} mode ('add', 'remove')
   */
  _manageEffectRegistration: function(effect, mode) {
    if (this.get('hasSkills')) {
      this._iterateAffects(effect, 'skill', mode);
    }

    if (this.get('hasStats')) {
      this._iterateAffects(effect, 'stat', mode);
    }

    if (!this.get('hasSkills') && !this.get('hasStats')) {
      if (mode === 'add') {
        this.get('effects').pushObject(effect);
      } else if (mode === 'remove') {
        this.set('effects', this.get('effects').rejectBy('id', effect.get('id')));
      }
    }
  },

  /**
   * @private
   * @param  {Effect} effect
   * @param  {string} _type
   * @param  {string} _mode ('add', 'remove', 'contains')
   */
  _iterateAffects: function(effect, _type, _mode) {
    let _this = this;
    let found = false;

    if (typeof effect === 'string') {
      this.get(_type.toLowerCase() + 's').forEach(function(s) {
        s.get('effects').filter(function(e) {
          return e.get('id') === effect &&
                 (
                  (e.get('duration') > 0 && e.get('_durationRunLaterCallback'))
                  ||
                  (e.get('canAutoIncrease') && e.get('autoIncreaseInterval') > 0 && e.get('_autoIncreaseRunLaterCallback'))
                 );
        }).forEach(function(e) {
          if (e.get('_durationRunLaterCallback')) {
            Ember.run.cancel(e.get('_durationRunLaterCallback'));
          }
          if (e.get('_autoIncreaseRunLaterCallback')) {
            Ember.run.cancel(e.get('_autoIncreaseRunLaterCallback'));
          }
        });
        s.set('effects', s.get('effects').rejectBy('id', effect));
      })
      return;
    }

    effect.get('affects').forEach(function(affect) {
      if (found && _mode === 'contains') return;

      let _tmpAffect = affect.split(':');
      let targetType = _tmpAffect[0], targetId = _tmpAffect[1];

      if (targetType === _type.toLowerCase()) {
        let targetObject = _this['get' + Ember.String.capitalize(_type)](targetId);
        if (_mode === 'add') {
          targetObject.get('effects').pushObject(effect);
        } else if (_mode === 'remove') {
          Ember.run.cancel(
            targetObject.get('effects').findBy('_uuid', effect.get('_uuid')).get('_durationRunLaterCallback')
          );
          Ember.run.cancel(
            targetObject.get('effects').findBy('_uuid', effect.get('_uuid')).get('_autoIncreaseRunLaterCallback')
          );
          targetObject.set('effects', targetObject.get('effects').rejectBy('_uuid', effect.get('_uuid')));
        } else if (_mode === 'contains') {
          if (targetObject.get('effects').findBy('id', effect.get('id'))) {
            found = true;
          }
        } else if (_mode === 'notify') {
          MUGRE.syncWithEffects(targetObject);
        }
      }
    });
    if (_mode === 'contains') {
      return found;
    }
  },

  /**
   * @private
   * @param  {Effect} effect
   * @return {Boolean}
   */
  _hasEffect: function(effect) {
    let has = false;
    if (this.get('hasSkills')) {
      has = has || this._iterateAffects(effect, 'skill', 'contains');
    }
    if (this.get('hasStats')) {
      has = has || this._iterateAffects(effect, 'stat', 'contains');
    }
    if (!this.get('hasStats') && !this.get('hasSkills')) {
      has = has || this.get('effects').findBy('id', effect.get('id'));
    }
    return has;
  },

  /**
   * Registers an effect. If the current object has skill
   * and stat support, it'll register the effect in the
   * proper effects array. Otherwise, it'll register it
   * in the current object itself.
   *
   * @param {Effect} effect
   */
  addEffect: function(effect) {
    let _this = this;

    if (!effect.get('canStack') && this._hasEffect(effect)) {
      return;
    }

    this._manageEffectRegistration(effect, 'add');

    if (effect.get('duration') > 0) {
      effect.set('_durationRunLaterCallback', Ember.run.later(function() {
        _this.removeEffect(effect);
      }, effect.get('duration') * 1000));
    }

    if (effect.get('canAutoIncrease') &&
        effect.get('autoIncreaseInterval') > 0 &&
        effect.get('autoIncreaseCallback')) {
      effect.set('_afterAutoIncrease', function() {
        if (_this.get('hasStats')) {
          _this._iterateAffects(effect, 'stat', 'notify');
        }
        if (_this.get('hasSkills')) {
          _this._iterateAffects(effect, 'skill', 'notify');
        }
      });
      effect._handleAutoIncrease();
    }
  },

  /**
   * Removes an effect.
   *
   * @method removeEffect
   * @param  {Effect|string} effect
   */
  removeEffect: function(effect) {
    if (!this.get('hasStats') && !this.get('hasSkills') && typeof effect === 'string') {
      this.set('effects', this.get('effects').rejectBy('id', effect));
    } else {
      this._manageEffectRegistration(effect, 'remove');
    }
  }
});
