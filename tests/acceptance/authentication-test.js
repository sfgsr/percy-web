import setupAcceptance from '../helpers/setup-acceptance';
import { authenticateSession } from 'percy-web/tests/helpers/ember-simple-auth';

import { beforeEach } from 'mocha';

function setupSession(createData) {
  beforeEach(function() {
    let application = this.application;
    window.localStorage.removeItem('lastOrganizationSlug');
    let created = createData(server);
    let user = created.user;
    authenticateSession(application, user);
  });
}

describe('Acceptance: Login', function() {
  setupAcceptance();

  context('logged in', function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization', slug: 'test_org', id:'test_org'});
      server.create('organizationUser', {userId: user.id, organizationId: organization.id});
      return {user: user};
    });

    it('can navigate to repository listing', function() {
      visit('/');

      click('.ReposLink a');
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });
      percySnapshot(this.test.fullTitle());
    });
  });
});
