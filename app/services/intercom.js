import Ember from 'ember';

export default Ember.Service.extend({
  adminMode: Ember.inject.service(),

  associateWithCompany(user, organization) {
    if (this.get('adminMode').excludeFromAnalytics()) {
      return;
    }

    if (window.Intercom && user.get('id')) {
      window.Intercom('update', {
        user_id: user.get('id'),
        company: {
          id: organization.get('id'),
          name: organization.get('name'),
        },
      });
    }
  },
});
