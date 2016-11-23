import setupAcceptance, { setupSession } from '../helpers/setup-acceptance';
import freezeMoment from '../helpers/freeze-moment';
import moment from 'moment';

describe('Acceptance: Project', function() {
  setupAcceptance();

  context('organization has no projects', function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization});
      this.loginUser = user;
    });

    it('can create', function() {
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

  context('settings', function() {
    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization});
      let enabled = server.create('project', {name: 'Enabled', organization: organization});
      let disabled = server.create('project', {name: 'Disabled', isEnabled: false, organization: organization});

      this.enabledProject = enabled;
      this.disabledProject = disabled;
      this.loginUser = user;
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

  context("builds", function() {
    freezeMoment('2018-05-22');

    setupSession(function (server) {
      let user = server.create('user', {name: 'Test user', id: 'test_user'});
      let organization = server.create('organization', {name: 'Test organization'});
      server.create('organizationUser', {user: user, organization: organization});
      let project = server.create('project', {name: 'with builds', organization: organization});
      server.create('build', {project: project, createdAt: moment().subtract(60, 'days') });
      server.create('build', {project: project, createdAt: moment().subtract(30, 'hours'),
        state: 'expired'});
      server.create('build', {project: project, createdAt: moment().subtract(3, 'hours'),
        state: 'failed'});
      server.create('build', {project: project, createdAt: moment().subtract(25, 'minutes'),
            state: 'failed', failureReason: 'render_timeout'});
      server.create('build', {project: project, createdAt: moment().subtract(25, 'minutes'),
          state: 'failed', failureReason: 'no_snapshots'});
      server.create('build', {project: project, createdAt: moment().subtract(15, 'minutes'),
        state: 'failed', failureReason: 'missing_resources'});
      server.create('build', {project: project, createdAt: moment().subtract(10, 'minutes'),
        state: 'pending'});
      server.create('build', {project: project, createdAt: moment().subtract(10, 'seconds'),
        state: 'processing'});
      this.project = project;
      this.loginUser = user;
    });
    it('shows builds on index', function() {
      visit(`/${this.project.fullSlug}`);
      andThen(() => {
        expect(currentPath()).to.equal('organization.project.index');
      });
      percySnapshot(this.test.fullTitle());
    });
  });
});
