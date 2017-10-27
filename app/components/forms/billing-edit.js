import {alias} from '@ember/object/computed';
import BaseFormComponent from './base';

export default BaseFormComponent.extend({
  subscription: null,
  classes: null,

  classNames: ['FormsBillingEdit', 'Form'],
  classNameBindings: ['classes'],

  model: alias('subscription'),
  validator: null,
});
