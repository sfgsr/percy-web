import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  organization: null,
  classes: null,

  isSaving: null,
  isSaveSuccessful: null,

  subscriptionData: service(),
  classNames: ['OrganizationsBillingSection'],
  classNameBindings: ['classes'],
  adminMode: service(),
  showCancel: computed('organization.subscription.isCustomer', function() {
    let isCustomer = this.get('organization.subscription.isCustomer');
    return isCustomer && this.get('adminMode').get() == 'admin';
  }),
  actions: {
    changingSubscription(savingPromise) {
      this.set('isSaveSuccessful', null);
      this.set('isSaving', true);
      savingPromise.then(
        () => {
          this.set('isSaving', false);
          this.set('isSaveSuccessful', true);
        },
        () => {
          this.set('isSaving', false);
          this.set('isSaveSuccessful', false);
        },
      );
    },
    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
