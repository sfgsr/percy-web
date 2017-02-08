import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  subscriptionData: Ember.inject.service(),

  name: DS.attr(),
  interval: DS.attr(),
  intervalCount: DS.attr('number'),
  workerLimit: DS.attr('number'),
  usageIncluded: DS.attr('number'),
  historyLimitDays: DS.attr('number'),

  isFree: Ember.computed.equal('id', 'free'),
  isPaid: Ember.computed.not('isFree'),
  isCustom: Ember.computed('id', function() {
    return this.get('subscriptionData.PLAN_IDS').indexOf(this.get('id')) === -1;
  }),
});

