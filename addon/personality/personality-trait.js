import Ember from 'ember';
import BasicMetadata from '../generics/basic-metadata';
import Effectable from '../effects/effectable';

/**
 * @see  http://ideonomy.mit.edu/essays/traits.html
 */
export default Ember.Object.extend(BasicMetadata, Effectable, {
  _type: 'personalityTrait',

  traitPolarity: null,

  traitPolarityChanged: Ember.observer('traitPolarity', function() {
    Ember.assert(['+', '-', 'o'].indexOf(this.get('traitPolarity')),
      'personalityTrait.traitPolarity must be "+" (positive), "-" (negative) or "o" (neutral)');
  })
});
