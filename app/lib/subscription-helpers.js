import Ember from 'ember';
import utils from '../lib/utils';

export default {
  changeSubscription(plan, token) {
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('subscription'),
      data: {
        plan: plan,
        token: token && token.id,
      },
    });
  },
  updateMetadata(billingEmail) {
    // TODO: get the JSON-API endpoint for subscriptions working.
    return Ember.$.ajax({
      type: 'PATCH',
      url: utils.buildApiUrl('subscription'),
      data: {
        data: {
          attributes: {
            'billing-email': billingEmail,
          },
        },
      },
    });
  },
};