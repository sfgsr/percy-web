import Ember from 'ember';
import BaseFormComponent from './base';

export default BaseFormComponent.extend({
  subscription: null,
  classes: null,

  classNames: ['FormsBillingEdit', 'Form'],
  classNameBindings: ['classes'],

  model: Ember.computed.alias('subscription'),
  validator: null,
});
