import { moduleFor, test } from 'ember-qunit';
import Traitable from 'xtrpg/personality/traitable';
import Ember from 'ember';
import Config from 'xtrpg/configuration';

moduleFor('router:main', 'Unit | Personality | Traitable', {});

test('define a random personality', function(assert) {
  var traitable = Ember.Object.extend(Traitable);
  var entity = traitable.create();
  entity.defineRandomPersonality();
  assert.ok(entity.get('personalityTraits.length') === Config.personalityTraits.defaultCount,
    'expected ' + Config.personalityTraits.defaultCount + ' traits, ' +
    'got ' + entity.get('personalityTraits.length'));
  assert.ok(entity.get('personalityTraits').map(function(trait) {
    return trait.get('_type') === 'personalityTrait';
  }).reduce(function(a, b) {
    return a && b;
  }), 'expected to get objects of type PersonalityTrait');
  assert.ok(entity.get('personalityTraits').map(function(trait) {
    return !!trait.get('id');
  }).reduce(function(a, b) {
    return a && b;
  }), 'expected not-null IDs in personalityTraits, got ' +
    entity.get('personalityTraits').map(function(trait) {
      return trait.get('id') + ' (' + trait.get('traitPolarity') + ')';
    }).join(',')
  );
});
