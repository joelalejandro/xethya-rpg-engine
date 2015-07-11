import { moduleFor, test } from 'ember-qunit';
import Circumstance from 'xtrpg/storytelling/circumstance';

moduleFor('router:main', 'Unit | Storytelling | Circumstance', {});

test('circumstance probability created via short syntax', function(assert) {
  var c = Circumstance.create({});
  var cp = c.addProbability('CarTheft%0.65');
  assert.ok(cp.get('id') === 'CarTheft', 'checking id: expected CarTheft, got ' + cp.get('id'));
  assert.ok(cp.get('name') === 'CarTheft', 'checking name: expected CarTheft, got ' + cp.get('name'));
  assert.ok(cp.get('chanceRate') === 0.65, 'checking chanceRate: expected 0.65, got ' + cp.get('chanceRate'));
});

test('circumstance defined with 3 different circumstance probabilities', function(assert) {
  var c = Circumstance.create({});
  c.addProbability('CarTheft%0.65');
  c.addProbability('Death%0.05');
  c.addProbability('Robbery%0.30');
  var defined = c.define();
  assert.ok(defined.get('_type') === 'circumstanceProbability', 'expected a circumstanceProbability object, got ' + defined.get('_type'));
  assert.ok(['CarTheft', 'Death', 'Robbery'].indexOf(defined.get('id')) > -1, 'expected one of the set probabilities, got ' + defined.get('id'));
});
