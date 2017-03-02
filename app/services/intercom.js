import Ember from 'ember';

export default Ember.Service.extend({
  adminMode: Ember.inject.service(),

  associateWithCompany(userId, companyId) {
    if (this.get('adminMode').excludeFromAnalytics()) {
      return;
    }

    if (userId && window.Intercom) {
      window.Intercom('update', {
        user_id: userId,
        company: {
          id: companyId,
        },
      });
    }
  }
});
