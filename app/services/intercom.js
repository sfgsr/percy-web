import Service, {inject as service} from '@ember/service';

export default Service.extend({
  adminMode: service(),

  associateWithCompany(user, organization) {
    if (this.get('adminMode').excludeFromAnalytics()) {
      return;
    }

    if (window.Intercom && user.get('id')) {
      window.Intercom('update', {
        user_id: user.get('id'),
        user_hash: user.get('userHash'),
        company: {
          id: organization.get('id'),
          name: organization.get('name'),
        },
      });
    }
  },
});
