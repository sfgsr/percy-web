import Ember from 'ember';
import utils from '../lib/utils';

export default {
  changeSubscription: function(plan, token) {
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('subscriptions'),
      data: {
        plan: plan,
        token: token && token.id,
      },
    });
  },
};