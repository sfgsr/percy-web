import Ember from 'ember';
import BaseFormComponent from './base';
import OrganizationNewValidations from '../../validations/organization-new';

export default BaseFormComponent.extend({
  marketplaceListingPlanId: null,
  classes: null,

  classNames: ['FormsOrganizationNew', 'Form'],
  classNameBindings: ['classes'],

  // Setup data for creating an org from different billing providers and marketplaces.
  _billingProvider: Ember.computed('marketplaceListingPlanId', function() {
    let marketplaceListingPlanId = this.get('marketplaceListingPlanId');
    if (marketplaceListingPlanId) {
      return 'ghm';
    }
  }),
  _billingProviderData: Ember.computed('marketplaceListingPlanId', function() {
    let marketplaceListingPlanId = this.get('marketplaceListingPlanId');
    if (marketplaceListingPlanId) {
      return JSON.stringify({
        marketplace_listing_plan_id: parseInt(marketplaceListingPlanId),
      });
    }
  }),

  model: Ember.computed(function() {
    return this.get('store').createRecord('organization', {
      billingProvider: this.get('_billingProvider'),
      billingProviderData: this.get('_billingProviderData'),
    });
  }),
  validator: OrganizationNewValidations,
});
