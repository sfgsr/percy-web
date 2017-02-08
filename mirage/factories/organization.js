import {Factory, trait} from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `My Organization ${i}`;
  },
  slug() {
    return this.name.underscore();
  },

  afterCreate(organization, server) {
    let subscription = server.create('subscription', {organization: organization});
    organization.update({subscription});
  },

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
