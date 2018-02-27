import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import {beforeEach, afterEach} from 'mocha';
import freezeMoment from '../helpers/freeze-moment';
import moment from 'moment';
import sinon from 'sinon';
import BuildPage from 'percy-web/tests/pages/build-page';
import {TEST_IMAGE_URLS} from 'percy-web/mirage/factories/screenshot';
import adminMode from 'percy-web/lib/admin-mode';
import {SNAPSHOT_APPROVED_STATE, SNAPSHOT_REVIEW_STATE_REASONS} from 'percy-web/models/snapshot';
import {BUILD_STATES} from 'percy-web/models/build';

describe('Acceptance: Pending Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();
  let urlParams;

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'pending build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'pending',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  it('shows as pending', function() {
    BuildPage.visitBuild(urlParams);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    BuildPage.toggleBuildInfoDropdown();

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });
});

describe('Acceptance: Processing Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();
  let urlParams;

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'project-with-processing-build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'processing',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  it('shows as processing', function() {
    BuildPage.visitBuild(urlParams);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    BuildPage.toggleBuildInfoDropdown();

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');
  });
});

describe('Acceptance: Failed Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();
  let urlParams;

  setupSession(function(server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'project-with-failed-build', organization});
    let build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      state: 'failed',
      failureReason: 'render_timeout',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  it('shows as failed', function() {
    BuildPage.visitBuild(urlParams);

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
    });
    percySnapshot(this.test.fullTitle() + ' on the build page');

    BuildPage.toggleBuildInfoDropdown();

    percySnapshot(this.test.fullTitle() + ' on the build page with build info open');

    window.Intercom = sinon.stub();

    BuildPage.clickShowSupportLink();
    andThen(() => {
      expect(window.Intercom).to.have.been.calledWith('show');
    });
  });
});

describe('Acceptance: Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  let project;
  let defaultSnapshot;
  let noDiffsSnapshot;
  let twoWidthsSnapshot;
  let urlParams;

  setupSession(function(server) {
    const organization = server.create('organization', 'withUser');
    project = server.create('project', {name: 'project-with-finished-build', organization});
    const build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      finishedAt: moment().subtract(5, 'seconds'),
      totalSnapshotsUnreviewed: 8,
      totalSnapshots: 12,
    });

    defaultSnapshot = server.create('snapshot', 'withComparison', {build});
    noDiffsSnapshot = server.create('snapshot', 'noDiffs', {
      build,
      name: 'No Diffs snapshot',
    });
    twoWidthsSnapshot = server.create('snapshot', 'withComparison', 'withMobile', {
      build,
      name: 'Two widths snapshot',
    });
    // not used yet, but assign to variable when it's important
    server.create('snapshot', 'withMobile', {
      build,
      name: 'Mobile only snapshot',
    });

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
    };
  });

  describe('with per-snapshot approval on', function() {
    beforeEach(function() {
      adminMode.setAdminMode();
    });

    afterEach(function() {
      adminMode.clear();
    });

   it('displays snapshots in the correct order, before and after approval when build is finished', function() { // eslint-disable-line

      const firstSnapshotExpectedName = defaultSnapshot.name;
      const secondSnapshotExpectedName = twoWidthsSnapshot.name;

      BuildPage.visitBuild(urlParams);

      andThen(() => {
        expect(BuildPage.snapshots(0).name).to.equal(firstSnapshotExpectedName);
        expect(BuildPage.snapshots(1).name).to.equal(secondSnapshotExpectedName);
        BuildPage.snapshots(0).clickApprove();
      });

      andThen(() => {
        expect(BuildPage.snapshots(0).name).to.equal(firstSnapshotExpectedName);
        expect(BuildPage.snapshots(1).name).to.equal(secondSnapshotExpectedName);
      });
    });

    // This tests the polling behavior in build-container and that initializeSnapshotOrdering method
    // is called and works correctly in builds/build controller.
    it('sorts snapshots correctly when a build moves from processing to finished via polling', function() { // eslint-disable-line
      // Get the mirage build object, set it to pending
      const build = server.schema.builds.where({id: '1'}).models[0];
      build.update({state: BUILD_STATES.PROCESSING});

      // Set a defaultSnapshot (which would normally display first)
      // to approved so we an have some sort behavior.
      defaultSnapshot.reviewState = SNAPSHOT_APPROVED_STATE;
      defaultSnapshot.reviewStateReason = SNAPSHOT_REVIEW_STATE_REASONS.USER_APPROVED;

      // Overwrite the build endpoint so the first time it will return the processing build
      // and the second time it will return a finished build.
      // This mocks the polling behavior (since the poller runs once in tests) and mocks the effect
      // of a build transitioning from processing to finished.
      const url = `/builds/${build.id}`;
      let hasVisitedBuildPage = false;
      server.get(url, () => {
        if (!hasVisitedBuildPage) {
          hasVisitedBuildPage = true;
          return build;
        } else {
          build.update({state: BUILD_STATES.FINISHED});
          return build;
        }
      });

      BuildPage.visitBuild(urlParams);

      andThen(() => {
        // We approved the snapshot that would normally be seen as first (default snapshot).
        // So the normal second snapshot (twoWidthsSnapshot) will now be first, and defaultSnapshot
        // will be second.
        expect(BuildPage.snapshotList.lastSnapshot.name).to.equal(defaultSnapshot.name);
        expect(BuildPage.snapshots(0).name).to.equal(twoWidthsSnapshot.name);
        percySnapshot(this.test);
      });
    });
  });

  // TODO: test number of snapshots, expanded, actionable status for all
  it('shows build overview info dropdown', function() {
    BuildPage.visitBuild(urlParams);
    BuildPage.toggleBuildInfoDropdown();
    percySnapshot(this.test.fullTitle());
  });

  it('toggles the image and pdiff', function() {
    let snapshot;
    BuildPage.visitBuild(urlParams);

    andThen(() => {
      snapshot = BuildPage.findSnapshotByName(defaultSnapshot.name);
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(BuildPage.snapshots(0).isDiffImageVisible).to.equal(true);

      snapshot.clickDiffImage();
    });

    andThen(() => {
      expect(snapshot.isDiffImageVisible).to.equal(false);
    });

    percySnapshot(this.test.fullTitle() + ' | hides overlay');

    andThen(() => {
      snapshot.clickDiffImageBox();
    });

    andThen(() => {
      expect(snapshot.isDiffImageVisible).to.equal(true);
    });

    percySnapshot(this.test.fullTitle() + ' | shows overlay');
  });

  it('walk across snapshots with arrow keys', function() {
    let firstSnapshot;
    let secondSnapshot;
    let thirdSnapshot;
    const urlBase = `/${project.fullSlug}/builds/1`;

    BuildPage.visitBuild(urlParams);

    andThen(() => {
      firstSnapshot = BuildPage.snapshots(0);
      secondSnapshot = BuildPage.snapshots(1);
      thirdSnapshot = BuildPage.snapshots(2);

      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(currentURL()).to.equal(urlBase);
    });

    BuildPage.typeDownArrow();
    percySnapshot(this.test.fullTitle() + ' | Down');

    andThen(() => {
      expect(BuildPage.focusedSnapshot().name).to.equal(defaultSnapshot.name);
      expect(firstSnapshot.isFocused).to.equal(true);
      expect(secondSnapshot.isFocused).to.equal(false);
      expect(thirdSnapshot.isFocused).to.equal(false);
    });

    BuildPage.typeDownArrow();
    percySnapshot(this.test.fullTitle() + ' | Down > Down');

    andThen(() => {
      expect(BuildPage.focusedSnapshot().name).to.equal(twoWidthsSnapshot.name);
      expect(firstSnapshot.isFocused).to.equal(false);
      expect(secondSnapshot.isFocused).to.equal(true);
      expect(thirdSnapshot.isFocused).to.equal(false);
    });

    BuildPage.typeUpArrow();
    percySnapshot(this.test.fullTitle() + ' | Down > Down > Up');

    andThen(() => {
      expect(BuildPage.focusedSnapshot().name).to.equal(defaultSnapshot.name);
      expect(firstSnapshot.isFocused).to.equal(true);
      expect(secondSnapshot.isFocused).to.equal(false);
      expect(thirdSnapshot.isFocused).to.equal(false);
    });
  });

  it('shows and hides unchanged diffs', function() {
    const snapshotName = noDiffsSnapshot.name;

    BuildPage.visitBuild(urlParams);

    andThen(() => {
      expect(BuildPage.isUnchangedPanelVisible).to.equal(true);
      expect(BuildPage.findSnapshotByName(snapshotName)).to.not.exist;
    });

    percySnapshot(this.test.fullTitle() + ' | shows batched no diffs');

    BuildPage.clickToggleNoDiffsSection();

    andThen(() => {
      const snapshot = BuildPage.findSnapshotByName(snapshotName);
      expect(BuildPage.isNoDiffsPanelVisible).to.equal(false);
      expect(snapshot.isExpanded).to.equal(false);
      expect(snapshot.isNoDiffBoxVisible).to.equal(false);
    });

    const lastSnapshot = BuildPage.snapshotList.lastSnapshot;
    lastSnapshot.expandSnapshot();

    andThen(() => {
      expect(BuildPage.isUnchangedPanelVisible).to.equal(false);
      expect(lastSnapshot.isExpanded).to.equal(true);
      expect(lastSnapshot.isUnchangedComparisonsVisible).to.equal(true);
    });

    percySnapshot(this.test.fullTitle() + ' | shows expanded no diffs');
  });

  it('toggles full view', function() {
    BuildPage.visitBuild(urlParams);
    BuildPage.snapshots(0).header.clickToggleFullscreen();

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.snapshot');
      expect(BuildPage.snapshotFullscreen.isVisible).to.equal(true);
    });

    BuildPage.snapshotFullscreen.header.clickToggleFullscreen();

    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(BuildPage.snapshotFullscreen.isVisible).to.equal(false);
    });
  });
});

describe('Acceptance: Fullscreen Snapshot', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  let project;
  let snapshot;
  let urlParams;

  setupSession(function(server) {
    const organization = server.create('organization', 'withUser');
    project = server.create('project', {name: 'project-with-finished-build', organization});
    const build = server.create('build', {
      project,
      createdAt: moment().subtract(2, 'minutes'),
      finishedAt: moment().subtract(5, 'seconds'),
    });
    snapshot = server.create('snapshot', 'withComparison', {build});

    urlParams = {
      orgSlug: organization.slug,
      projectSlug: project.slug,
      buildId: build.id,
      snapshotId: snapshot.id,
      width: snapshot.comparisons.models[0].width,
      mode: 'diff',
    };
  });

  it('responds to keystrokes and click in full view', function() {
    BuildPage.visitFullPageSnapshot(urlParams);

    BuildPage.snapshotFullscreen.typeRightArrow();

    andThen(() => {
      expect(currentURL()).to.include('mode=head');
    });

    BuildPage.snapshotFullscreen.typeLeftArrow();

    andThen(() => {
      expect(currentURL()).to.include('mode=diff');
    });

    BuildPage.snapshotFullscreen.clickComparisonViewer();
    andThen(() => {
      expect(currentURL()).to.include('mode=head');
    });

    BuildPage.snapshotFullscreen.typeEscape();
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build.index');
      expect(BuildPage.snapshotFullscreen.isVisible).to.equal(false);
    });
  });

  it('toggles between old/diff/new comparisons when interacting with comparison mode switcher', function() { // eslint-disable-line
    BuildPage.visitFullPageSnapshot(urlParams);

    BuildPage.snapshotFullscreen.clickBaseComparisonMode();

    andThen(() => {
      expect(BuildPage.snapshotFullscreen.comparisonImageUrl).to.equal(TEST_IMAGE_URLS.V1);
    });

    BuildPage.snapshotFullscreen.clickHeadComparisonMode();

    andThen(() => {
      expect(BuildPage.snapshotFullscreen.comparisonImageUrl).to.equal(TEST_IMAGE_URLS.V2);
    });

    BuildPage.snapshotFullscreen.clickDiffComparisonMode();

    andThen(() => {
      expect(BuildPage.snapshotFullscreen.diffImageUrl).to.equal(TEST_IMAGE_URLS.DIFF_URL);
    });
  });
});
