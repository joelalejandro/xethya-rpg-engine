import Ember from 'ember';
import BasicMetadata from '../core/basic-metadata';

export default Ember.Object.extend(BasicMetadata, {
  _type: 'circumstanceProbability',

  chanceRate: 0
});
