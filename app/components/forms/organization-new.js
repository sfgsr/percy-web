import Ember from 'ember';
import BaseFormComponent from './base';
import OrganizationNewValidations from '../../validations/organization-new';

export default BaseFormComponent.extend({
  organizationCreated: null,

  model: Ember.computed(function() {
    return this.get('store').createRecord('organization', {});
  }),
  validator: OrganizationNewValidations,

  actions: {
  },
});
