import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import freezeMoment from '../helpers/freeze-moment';
import moment from 'moment';
import ProjectPage from 'percy-web/tests/pages/project-page';

describe('Acceptance: Project', function() {
  setupAcceptance();

  describe('organization has no projects', function() {
    setupSession(function(server) {
      this.organization = server.create('organization', 'withUser');
    });

    it('can create', async function() {
      await visit(`/${this.organization.slug}`);
      expect(currentPath()).to.equal('organization.index');
      await percySnapshot(this.test.fullTitle() + ' | index');

      await click('a:contains("Create your first project")');
      expect(currentPath()).to.equal('organizations.organization.projects.new');

      await percySnapshot(this.test.fullTitle() + ' | new project');
    });
  });

  describe('waiting for first snapshot', function() {
    setupSession(function(server) {
      let organization = server.create('organization', 'withUser');
      let project = server.create('project', {
        name: 'My Project Name',
        organization,
      });
      server.create('token', {project});
      this.project = project;
    });

    it('shows environment variables and demo project instructions', async function() {
      await visit(`/${this.project.fullSlug}`);
      expect(currentPath()).to.equal('organization.project.index');

      await percySnapshot(this.test);
      await click('a:contains("Demo Project Instructions")');
      await percySnapshot(this.test.fullTitle() + ' | demo project instructions are visible');
    });
  });

  describe('settings', function() {
    let organization;
    let versionControlIntegration;
    let repos;
    setupSession(function(server) {
      organization = server.create('organization', 'withUser');
      versionControlIntegration = server.create('versionControlIntegration', 'github');
      repos = server.createList('repo', 3);
      let disabled = server.create('project', {
        name: 'Disabled Project',
        isEnabled: false,
        organization,
      });
      let enabled = server.create('project', {name: 'Enabled Project', organization});

      this.enabledProject = enabled;
      this.disabledProject = disabled;
    });

    it('for disabled', async function() {
      await visit(`/${this.disabledProject.fullSlug}/settings`);
      expect(currentPath()).to.equal('organization.project.settings');
      expect(find('[data-test-sidenav-list-projects] li:eq(0)').text()).to.match(
        /Disabled Project/,
      );
      expect(find('[data-test-sidenav-list-projects] li:eq(1)').text()).to.match(/Enabled Project/);
      expect(find('[data-test-sidenav-list-projects] li:eq(2)').text()).to.match(
        /Start new project/,
      );

      await percySnapshot(this.test);
    });

    it('for enabled', async function() {
      await visit(`/${this.enabledProject.fullSlug}/settings`);
      expect(currentPath()).to.equal('organization.project.settings');
      expect(find('[data-test-sidenav-list-projects] li:eq(0)').text()).to.match(
        /Disabled Project/,
      );
      expect(find('[data-test-sidenav-list-projects] li:eq(1)').text()).to.match(/Enabled Project/);
      expect(find('[data-test-sidenav-list-projects] li:eq(2)').text()).to.match(
        /Start new project/,
      );

      await percySnapshot(this.test);
    });

    it('displays github integration select menu', async function() {
      organization.update({versionControlIntegrations: [versionControlIntegration], repos});

      await visit(`/${this.enabledProject.fullSlug}/settings`);
      await percySnapshot(this.test);
    });
  });

  describe('builds', function() {
    freezeMoment('2018-05-22');

    let urlParams;

    setupSession(function(server) {
      let organization = server.create('organization', 'withUser');
      let project = server.create('project', {
        name: 'project with builds',
        organization,
      });
      server.create('project', {
        name: 'project without builds',
        organization,
      });

      urlParams = {
        orgSlug: organization.slug,
        projectSlug: project.slug,
      };

      server.create('build', {
        project,
        createdAt: moment().subtract(60, 'days'),
        totalSnapshotsUnreviewed: 8,
        totalSnapshots: 12,
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(30, 'hours'),
        state: 'expired',
        totalSnapshots: 12,
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(3, 'hours'),
        state: 'failed',
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(25, 'minutes'),
        state: 'failed',
        failureReason: 'render_timeout',
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(25, 'minutes'),
        state: 'failed',
        failureReason: 'no_snapshots',
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(15, 'minutes'),
        state: 'failed',
        failureReason: 'missing_resources',
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(10, 'minutes'),
        state: 'pending',
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(5, 'minutes'),
        state: 'finished',
        review_state: 'approved',
        review_state_reason: 'all_snapshots_approved',
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(4, 'minutes'),
        state: 'finished',
        review_state: 'approved',
        review_state_reason: 'all_snapshots_approved_previously',
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(2, 'minutes'),
        state: 'finished',
        review_state: 'approved',
        review_state_reason: 'no_diffs',
        totalComparisonsDiff: 0,
        totalComparisonsFinished: 1588,
      });
      server.create('build', {
        project,
        createdAt: moment().subtract(10, 'seconds'),
        state: 'processing',
      });
      this.project = project;
    });

    it('shows builds on index', async function() {
      await ProjectPage.visitProject(urlParams);
      await percySnapshot(this.test);
      expect(currentPath()).to.equal('organization.project.index');
    });

    it('navigates to build page after clicking build', async function() {
      await ProjectPage.visitProject(urlParams);
      expect(currentPath()).to.equal('organization.project.index');

      await ProjectPage.finishedBuilds[0].click();
      expect(currentPath()).to.equal('organization.project.builds.build.index');

      await percySnapshot(this.test.fullTitle());
    });
  });
});
