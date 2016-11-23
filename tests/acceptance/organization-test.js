import setupAcceptance, { setupSession } from '../helpers/setup-acceptance';

describe('Acceptance: Organization', function() {
  setupAcceptance();

  context('user is member', function () {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      let project = server.create('project', {name: 'The Project', organization: organization});
      server.create('organizationUser', {user: user, organization: organization, role: 'member'});
      this.organization = organization;
      this.project = project;
      this.loginUser = user;
    });

    it('denies billing settings', function() {
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

    it('lists projects', function() {
      visit('/');

      click('.ReposLink a');
      andThen(() => {
        expect(currentPath()).to.equal('organization.index');
      });
      percySnapshot(this.test.fullTitle());
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
  });

  context('user is admin', function () {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization, role: 'admin'});
      this.organization = organization;
      this.loginUser = user;
    });

    it('can edit organization settings', function() {
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

  context('user is github bot user',function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization', githubBotUser: user});
      server.create('organizationUser', {user: user, organization: organization, role: 'admin'});
      this.organization = organization;
      this.loginUser = user;
    });

    it('shows private repos access', function() {
      visit(`/organizations/${this.organization.slug}/settings`);
      andThen(() => {
        expect(currentPath()).to.equal('organizations.organization.settings');
      });
      percySnapshot(this.test.fullTitle());

      click('.SyncReposSection p:contains("Private repository access")');
      percySnapshot(this.test.fullTitle() + ' | private repository access');
    });
  });
});
