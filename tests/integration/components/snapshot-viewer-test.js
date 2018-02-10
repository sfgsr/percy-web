/* jshint expr:true */
/* eslint-disable no-unused-expressions */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach, afterEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';
import sinon from 'sinon';
import SnapshotViewerPO from 'percy-web/tests/pages/components/snapshot-viewer';
import {resolve} from 'rsvp';
import adminMode from 'percy-web/lib/admin-mode';
import {SNAPSHOT_APPROVED_STATE, SNAPSHOT_UNAPPROVED_STATE} from 'percy-web/models/snapshot';
import wait from 'ember-test-helpers/wait';

describe('Integration: SnapshotViewer', function() {
  setupComponentTest('snapshot-viewer', {
    integration: true,
  });

  let snapshotTitle;
  const widthIndex = 1;
  // NOTE: these need to be the same as the widths in the snapshot factory
  const buildWidths = [375, 550, 1024];
  const buildContainerSelectedWidth = buildWidths[widthIndex];
  let showSnapshotFullModalTriggeredStub;
  let createReviewStub;

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerPO.setContext(this);

    showSnapshotFullModalTriggeredStub = sinon.stub();
    createReviewStub = sinon.stub().returns(resolve());
    snapshotTitle = 'Awesome snapshot title';
    const snapshot = make('snapshot', {name: snapshotTitle});
    const build = make('build');
    build.set('snapshots', [snapshot]);
    const stub = sinon.stub();

    this.setProperties({
      stub,
      snapshot,
      build,
      buildWidths,
      buildContainerSelectedWidth,
      showSnapshotFullModalTriggered: showSnapshotFullModalTriggeredStub,
      createReview: createReviewStub,
      // true is the default in the component
      isDefaultExpanded: true,
    });

    this.render(hbs`{{snapshot-viewer
      snapshot=snapshot
      build=build
      buildWidths=buildWidths
      buildContainerSelectedWidth=buildContainerSelectedWidth
      showSnapshotFullModalTriggered=showSnapshotFullModalTriggered
      snapshotWidthChangeTriggered=stub
      createReview=createReview
    }}`);
  });

  it('displays snapshot name', function() {
    expect(SnapshotViewerPO.header.isTitleVisible, 'title should be visible').to.equal(true);

    expect(SnapshotViewerPO.header.titleText, 'title text should be correct').to.equal(
      snapshotTitle,
    );
  });

  it('compares visually to previous screenshot', function() {
    percySnapshot(this.test);
  });

  describe('comparison mode switcher', function() {
    it('does does not display', function() {
      expect(
        SnapshotViewerPO.header.isComparisonModeSwitcherVisible,
        'comparison mode switcher should not be visible',
      ).to.equal(false);
    });
  });

  describe('width switcher', function() {
    it('displays', function() {
      expect(
        SnapshotViewerPO.header.isWidthSwitcherVisible,
        'width switcher should be visible',
      ).to.equal(true);
    });

    it('has the right number of buttons', function() {
      expect(
        SnapshotViewerPO.widthSwitcher.buttons().count,
        'there should be correct number of buttons',
      ).to.equal(buildWidths.length);
    });

    it('displays correct text on the buttons', function() {
      SnapshotViewerPO.widthSwitcher.buttons().forEach((button, i) => {
        expect(button.text, `button ${i} should contain correct width`).to.equal(
          `${buildWidths[i]}px`,
        );
      });
    });

    it('displays correct number as selected', function() {
      expect(SnapshotViewerPO.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.widthSwitcher.buttons(widthIndex).isActive).to.equal(true);
      expect(SnapshotViewerPO.widthSwitcher.buttons(2).isActive).to.equal(false);
    });

    it('updates active button when clicked', function() {
      SnapshotViewerPO.widthSwitcher.buttons(0).click();
      expect(SnapshotViewerPO.widthSwitcher.buttons(0).isActive).to.equal(true);
      expect(SnapshotViewerPO.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerPO.widthSwitcher.buttons(2).isActive).to.equal(false);

      SnapshotViewerPO.widthSwitcher.buttons(2).click();
      expect(SnapshotViewerPO.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerPO.widthSwitcher.buttons(2).isActive).to.equal(true);

      SnapshotViewerPO.widthSwitcher.buttons(1).click();
      expect(SnapshotViewerPO.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.widthSwitcher.buttons(1).isActive).to.equal(true);
      expect(SnapshotViewerPO.widthSwitcher.buttons(2).isActive).to.equal(false);
    });
  });

  describe('full screen toggle button', function() {
    it('displays', function() {
      expect(SnapshotViewerPO.header.isFullScreenToggleVisible).to.equal(true);
    });

    it('sends closeSnapshotFullModal when toggle fullscreen button is clicked', function() {
      SnapshotViewerPO.header.clickToggleFullscreen();
      expect(showSnapshotFullModalTriggeredStub).to.have.been.calledWith(
        this.get('snapshot.id'),
        this.get('buildContainerSelectedWidth'),
      );
    });
  });

  describe('expand/collapse', function() {
    it('is expanded by default when the snapshot is unapproved', function() {
      this.set('snapshot.reviewState', SNAPSHOT_UNAPPROVED_STATE);
      expect(SnapshotViewerPO.isExpanded).to.equal(true);
    });

    it('is collapsed by default when the snapshot is approved', function() {
      this.set('snapshot.reviewState', SNAPSHOT_APPROVED_STATE);
      expect(SnapshotViewerPO.isExpanded).to.equal(false);
    });

    it('is collapsed when isDefaultExpanded is false', function() {
      this.set('snapshot.reviewState', SNAPSHOT_UNAPPROVED_STATE);
      this.set('isDefaultExpanded', false);

      return wait(() => {
        expect(SnapshotViewerPO.isExpanded).to.equal(false);
      });
    });

    it('is expanded when build is approved', function() {
      this.set('snapshot.reviewState', SNAPSHOT_APPROVED_STATE);
      this.set('build.isApproved', true);

      expect(SnapshotViewerPO.isExpanded).to.equal(true);
    });
  });
});

describe('Integration: SnapshotViewer with per snapshot approval', function() {
  setupComponentTest('snapshot-viewer', {
    integration: true,
  });

  let snapshotTitle;
  const widthIndex = 1;
  // NOTE: these need to be the same as the widths in the snapshot factory
  const buildWidths = [375, 550, 1024];
  const buildContainerSelectedWidth = buildWidths[widthIndex];
  let showSnapshotFullModalTriggeredStub;
  let createReviewStub;

  beforeEach(function() {
    adminMode.setAdminMode();
  });
  afterEach(function() {
    adminMode.clear();
  });

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerPO.setContext(this);

    showSnapshotFullModalTriggeredStub = sinon.stub();
    createReviewStub = sinon.stub().returns(resolve());
    snapshotTitle = 'Awesome snapshot title';
    const snapshot = make('snapshot', {name: snapshotTitle});
    const build = make('build');
    build.set('snapshots', [snapshot]);
    const stub = sinon.stub();

    this.setProperties({
      stub,
      snapshot,
      build,
      buildWidths,
      buildContainerSelectedWidth,
      showSnapshotFullModalTriggered: showSnapshotFullModalTriggeredStub,
      createReview: createReviewStub,
    });

    this.render(hbs`{{snapshot-viewer
      snapshot=snapshot
      build=build
      buildWidths=buildWidths
      buildContainerSelectedWidth=buildContainerSelectedWidth
      showSnapshotFullModalTriggered=showSnapshotFullModalTriggered
      snapshotWidthChangeTriggered=stub
      createReview=createReview
    }}`);
  });

  // TODO: move this test into main block when the feature ships for real
  describe('approve snapshot button', function() {
    it('sends createReview with correct arguments when approve button is clicked', function() {
      percySnapshot(this.test);

      SnapshotViewerPO.header.clickApprove();
      expect(createReviewStub).to.have.been.calledWith('approve', this.get('build'), [
        this.get('build.snapshots.firstObject'),
      ]);
    });
  });
});
