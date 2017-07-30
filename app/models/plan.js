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
  allowOverages: DS.attr('boolean'),
  overageUnitCost: DS.attr('number'),
  isTrial: DS.attr('boolean'),
  isFree: DS.attr('boolean'),

  isCustom: Ember.computed('id', function() {
    return this.get('subscriptionData.PLAN_IDS').indexOf(this.get('id')) === -1;
  }),
});
