import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  plan: DS.attr(),
  planName: DS.attr(),
  planUsageLimit: DS.attr('number'),
  planHistoryLimitDays: DS.attr('number'),
  currentUsage: DS.attr('number'),
  billingEmail: DS.attr(),

  isFree: Ember.computed.equal('plan', 'free'),
  isPaid: Ember.computed.not('isFree'),
});

