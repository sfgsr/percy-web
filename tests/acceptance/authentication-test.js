import setupAcceptance from '../helpers/setup-acceptance';
import { authenticateSession } from 'percy-web/tests/helpers/ember-simple-auth';
import Ember from 'ember';

import { beforeEach } from 'mocha';

function renderAdapterErrorsAsPage(callbackThatReturnsAPromise) {
  // https://github.com/emberjs/ember.js/issues/12791
  let adapterException = Ember.Test.adapter.exception;
  Ember.Test.adapter.exception = (error) => {
    if (error.isAdapterError) {
      Ember.Logger.info('Rendering exception:', error, ' as application error page');
      return null;
    } else {
      return adapterException(error);
    }
  };
  return callbackThatReturnsAPromise().
    finally(() => {
      Ember.Test.adapter.exception = adapterException;
      adapterException = null;
    });
}

function setupSession(createData) {
  beforeEach(function() {
    let application = this.application;
    window.localStorage.removeItem('lastOrganizationSlug');
    let created = createData.bind(this)(server);
    let user = created.user;
    authenticateSession(application, {user: user});
  });
}

describe('Acceptance: Join', function() {
  setupAcceptance();

  context('invite', function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test org'});
      server.create('organizationUser', {user: user, organization: organization});
      let anotherOrganization = server.create('organization', {name: 'Other org'});
      server.create('invite', {id: 'valid-code', organization: anotherOrganization});
      server.create('invite', {id: 'expired-code', isExpired: true});
      return {user: user};
    });

    it('expired rejected', function () {
      visit('/join/expired-code');
      andThen(() => {
        expect(currentPath()).to.equal('join');
      });
      return percySnapshot(this.test.fullTitle());
    });

    it('invalid rejected', function() {
      renderAdapterErrorsAsPage(() => {
        visit('/join/invalid-code');
        andThen(() => {
          expect(currentPath()).to.equal('error');
        });
        return percySnapshot(this.test.fullTitle());
      });
    });

    it('valid accepted', function() {
      visit('/join/valid-code');
      andThen(() => {
        expect(currentPath()).to.equal('join');
      });
      percySnapshot(this.test.fullTitle());

      click('.InvitationHandler button:contains("Accept invitation")');
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });
      percySnapshot(this.test.fullTitle() + ' | Into organization');
    });
  });
});

describe('Acceptance: Login', function() {
  setupAcceptance();

  context('organization with repositories', function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization});
      let project = server.create('project', {name: 'with builds', organization: organization});
      server.create('project', {name: 'Enabled', organization: organization});
      server.create('project', {name: 'Disabled', isEnabled: false, organization: organization});
      server.create('build', {project: project});
      server.create('build', {project: project, state: 'pending'});
      server.create('build', {project: project, state: 'processing'});

      return {user: user};
    });

    it('can create new organization', function() {
      visit('/');

      click('.ReposLink a');
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });
      click('.OrganizationsSwitcherNav-item');
      click('a:contains("Create new organization")');
      andThen(() => {
        expect(currentPath()).to.equal('organizations.new');
      });
      percySnapshot(this.test.fullTitle() + ' | new');
      fillIn('.FormsOrganizationNew input[type=text]', 'New organization');
      click('.FormsOrganizationNew input[type=submit]');
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.setup');
      });
      percySnapshot(this.test.fullTitle() + ' | setup');
    });

    it('lists projects', function() {
      visit('/');

      click('.ReposLink a');
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });
      percySnapshot(this.test.fullTitle());
    });
  });

  context('project settings',function() {
    setupSession(function (server) {
      server.logging = true;
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization});
      let enabled = server.create('project', {name: 'Enabled', organization: organization});
      let disabled = server.create('project', {name: 'Disabled', isEnabled: false, organization: organization});

      this.enabledProject = enabled;
      this.disabledProject = disabled;

      return {user: user};
    });

    it('for disabled', function() {
      visit(`/${this.disabledProject.fullSlug}/settings`);
      andThen(() => {
        expect(currentPath()).to.equal('organization.project.settings');
      });
      percySnapshot(this.test.fullTitle());
    });

    it('for enabled', function() {
      visit(`/${this.enabledProject.fullSlug}/settings`);
      andThen(() => {
        expect(currentPath()).to.equal('organization.project.settings');
      });
      percySnapshot(this.test.fullTitle());
    });
  });

  context('when user is github bot user',function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization', githubBotUser: user});
      server.create('organizationUser', {user: user, organization: organization, role: 'admin'});
      this.organization = organization;
      return {user: user};
    });

    it('edit organization settings', function() {
      visit(`/organizations/${this.organization.slug}/settings`);
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.settings');
      });
      percySnapshot(this.test.fullTitle());

      click('.SyncReposSection p:contains("Private repository access")');
      percySnapshot(this.test.fullTitle() + ' | private repository access');
    });
  });

  context('when admin of organization', function () {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization, role: 'admin'});
      this.organization = organization;
      return {user: user};
    });

    it('edit organization settings', function() {
      visit(`/${this.organization.slug}`);
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });

      click('.NavMenu-item a:contains("Settings")');
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.settings');
      });
      percySnapshot(this.test.fullTitle());

      fillIn('.FormsOrganizationEdit span:contains("Slug") + input', 'invalid/slug');
      click('.FormsOrganizationEdit input[type=submit]');
      percySnapshot(this.test.fullTitle() + ' | Error when invalid slug');

      click('.Panel .Panel-nav a:contains("Users")');
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.users.index');
      });
      percySnapshot(this.test.fullTitle() + ' | Users settings');

      click('.Panel .Panel-nav a:contains("Billing")');
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.billing');
      });
      percySnapshot(this.test.fullTitle() + ' | Billing settings');
    });
  });

  context('when member of organization', function () {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      let project = server.create('project', {name: 'The Project', organization: organization});
      server.create('organizationUser', {user: user, organization: organization, role: 'member'});
      this.organization = organization;
      this.project = project;
      return {user: user};
    });

    it('billing settings denied', function() {
      visit(`/${this.organization.slug}`);
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });

      click('a.ProjectCard-link');
      andThen(() => {
        expect(currentPath()).to.equal('organization.project.index');
      });

      click('.ProjectContainer a:contains("Settings")');
      andThen(() => {
        expect(currentPath()).to.equal('organization.project.settings');
      });

      click('.Panel .Panel-nav a:contains("Billing")');
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.billing');
      });
      percySnapshot(this.test.fullTitle());
    });
  });

  context('organization but no repositories', function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization});
      return {user: user};
    });

    it('can create new project', function() {
      visit('/');

      click('.ReposLink a');
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });
      percySnapshot(this.test.fullTitle() + ' | index');

      click('a:contains("Create your first project")');
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.projects.new');
      });
      percySnapshot(this.test.fullTitle() + ' | new project');
    });
  });
});
