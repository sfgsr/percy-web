import moment from 'moment';
import {Factory, trait} from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `My Organization ${i}`;
  },
  slug() {
    return this.name.underscore();
  },

  afterCreate(organization, server) {
    if (!organization.subscription) {
      let subscription = server.create('subscription', {organization: organization});
      organization.update({subscription});
    }
  },

  withTrial: trait({
    afterCreate(organization, server) {
      let subscription = server.create('subscription', {
        organization: organization,
        trialStart: moment(),
        trialEnd: moment().add(14, 'days').add(1, 'hour'),
        plan: server.create('plan', 'trial'),
      });
      organization.update({subscription});
    }
  }),

  withUser: trait({
    afterCreate(organization, server) {
      let user = server.create('user');
      server.create('organizationUser', {user, organization, role: 'member'});
    }
  }),

  withAdminUser: trait({
    afterCreate(organization, server) {
      let user = server.create('user');
      server.create('organizationUser', {user, organization, role: 'admin'});
    }
  }),
});
