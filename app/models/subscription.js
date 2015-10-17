import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  plan: DS.attr(),
  planName: DS.attr(),
  planUsageLimit: DS.attr('number'),
  currentUsage: DS.attr('number'),
  billingEmail: DS.attr(),

  isFree: Ember.computed.equal('plan', 'free'),
  isPaid: Ember.computed.not('isFree'),

  isMicro: Ember.computed.equal('plan', 'micro'),
  isSmall: Ember.computed.equal('plan', 'small'),
  isMedium: Ember.computed.equal('plan', 'medium'),
  isLarge: Ember.computed.equal('plan', 'large'),
  isEnterprise: Ember.computed.equal('plan', 'enterprise'),
});

