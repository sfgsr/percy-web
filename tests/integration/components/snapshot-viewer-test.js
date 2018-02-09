/* jshint expr:true */
/* eslint-disable no-unused-expressions */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';
import sinon from 'sinon';
import SnapshotViewerPO from 'percy-web/tests/pages/components/snapshot-viewer';

describe('Integration: SnapshotViewer', function() {
  setupComponentTest('snapshot-viewer', {
    integration: true,
  });

  let snapshotTitle;
  let showSnapshotFullModalTriggeredStub;
  let snapshot;

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerPO.setContext(this);

    showSnapshotFullModalTriggeredStub = sinon.stub();
    snapshotTitle = 'Awesome snapshot title';
    snapshot = make('snapshot', 'withComparisons', {name: snapshotTitle});
    const build = make('build');
    const stub = sinon.stub();

    this.setProperties({
      stub,
      snapshot,
      build,
      userSelectedWidth: null,
      showSnapshotFullModalTriggered: showSnapshotFullModalTriggeredStub,
    });

    this.render(hbs`{{snapshot-viewer
      snapshot=snapshot
      build=build
      showSnapshotFullModalTriggered=showSnapshotFullModalTriggered
      snapshotWidthChangeTriggered=stub
      userSelectedWidth=userSelectedWidth
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
    it('shows widest width with diff as active by default', function() {
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(true);
    });

    it('updates active button when clicked', function() {
      SnapshotViewerPO.header.widthSwitcher.buttons(0).click();
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(true);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);

      SnapshotViewerPO.header.widthSwitcher.buttons(2).click();
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(1).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(true);

      SnapshotViewerPO.header.widthSwitcher.buttons(1).click();
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(0).isActive).to.equal(false);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(1).isActive).to.equal(true);
      expect(SnapshotViewerPO.header.widthSwitcher.buttons(2).isActive).to.equal(false);
    });
  });

  describe('full screen toggle button', function() {
    it('displays', function() {
      expect(SnapshotViewerPO.header.isFullScreenToggleVisible).to.equal(true);
    });

    it('sends closeSnapshotFullModal when toggle fullscreen button is clicked', function() {
      const selectedWidth = snapshot.get('comparisons.firstObject.width');
      this.set('userSelectedWidth', selectedWidth);

      SnapshotViewerPO.header.clickToggleFullscreen();
      expect(showSnapshotFullModalTriggeredStub).to.have.been.calledWith(
        this.get('snapshot.id'),
        selectedWidth,
      );
    });
  });
});
