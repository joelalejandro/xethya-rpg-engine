import Ember from 'ember';
import BasicMetadata from '../generics/basic-metadata';

export default Ember.Object.extend(BasicMetadata, {
  line: null,
  duration: null
});
