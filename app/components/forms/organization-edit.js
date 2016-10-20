import Ember from 'ember';
import BaseFormComponent from './base';
import OrganizationEditValidations from '../../validations/organization-edit';

export default BaseFormComponent.extend({
  organization: null,

  model: Ember.computed.alias('organization'),
  validator: OrganizationEditValidations,
});
