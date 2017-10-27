import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import DS from 'ember-data';

export default DS.Model.extend({
  subscriptionData: service(),

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

  isCustom: computed('id', function() {
    return this.get('subscriptionData.PLAN_IDS').indexOf(this.get('id')) === -1;
  }),
});
