/* jshint expr:true */
/* eslint-disable no-unused-expressions */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import {make, makeList, manualSetup} from 'ember-data-factory-guy';
import sinon from 'sinon';
import {percySnapshot} from 'ember-percy';
import SnapshotList from 'percy-web/tests/pages/components/snapshot-list';
import wait from 'ember-test-helpers/wait';

describe('Integration: SnapshotList', function() {
  setupComponentTest('snapshot-list', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotList.setContext(this);
  });

  it('displays snapshots in the correct order, before approval when build is finished', function() {
    const approvedSnapshotTitle = 'Approved snapshot!!';
    const unapprovedSnapshotTitle = 'Unapproved snapshot!!';
    const stub = sinon.stub();
    const build = make('build', 'finished');

    const unapprovedSnapshot = make('snapshot', 'withComparisons', {
      build,
      name: unapprovedSnapshotTitle,
    });
    const approvedSnapshot = make('snapshot', 'approved', 'withComparisons', {
      build,
      name: approvedSnapshotTitle,
    });
    const snapshots = [approvedSnapshot, unapprovedSnapshot];
    this.setProperties({
      snapshots,
      build,
      stub,
    });

    this.render(hbs`{{snapshot-list
        snapshots=snapshots
        build=build
        createReview=stub
        showSnapshotFullModalTriggered=stub
      }}`);

    const titlesBeforeApproval = SnapshotList.snapshotTitles;

    expect(titlesBeforeApproval[0]).to.equal(unapprovedSnapshotTitle);
    expect(titlesBeforeApproval[1]).to.equal(approvedSnapshotTitle);
  });

  it('expands batched hidden snapshots', function() {
    const stub = sinon.stub();
    const build = make('build', 'finished');

    const numSnapshots = 3;
    const snapshots = makeList('snapshot', numSnapshots, 'withNoDiffs');
    this.set('snapshots', snapshots);

    this.setProperties({
      snapshots,
      build,
      stub,
    });

    this.render(hbs`{{snapshot-list
      snapshots=snapshots
      build=build
      createReview=stub
      showSnapshotFullModalTriggered=stub
    }}`);

    expect(SnapshotList.isNoDiffsBatchVisible).to.equal(true);

    SnapshotList.clickToggleNoDiffsSection();

    expect(SnapshotList.isNoDiffsBatchVisible).to.equal(false);
    expect(SnapshotList.snapshots().count).to.equal(numSnapshots);
  });

  describe('keyboard nav behavior', function() {
    const numSnapshots = 3;
    beforeEach(function() {
      const stub = sinon.stub();
      const build = make('build', 'finished');

      const snapshotsWithDiffs = makeList('snapshot', numSnapshots, 'withComparisons', {build});
      const snapshotsNoDiffs = makeList('snapshot', 3, 'withNoDiffs', {build});
      const snapshots = snapshotsWithDiffs.concat(snapshotsNoDiffs);
      this.setProperties({build, snapshots, stub});

      this.render(hbs`{{snapshot-list
        snapshots=snapshots
        build=build
        createReview=stub
        showSnapshotFullModalTriggered=stub
      }}`);
    });

    it('automatically expands collapsed snapshots if focused', function() {
      // Open the collapsed no-diff snapshots
      SnapshotList.clickToggleNoDiffsSection();

      const firstNoDiffSnapshot = SnapshotList.snapshots(3);
      const secondNoDiffSnapshot = SnapshotList.snapshots(4);
      const thirdNoDiffSnapshot = SnapshotList.snapshots(5);

      // Manaully click the first snapshot.
      firstNoDiffSnapshot.expandSnapshot();
      wait();

      // We clicked on the first snapshot, so it's comparisons should be visible
      expect(firstNoDiffSnapshot.isUnchangedComparisonsVisible).to.equal(true);
      expect(secondNoDiffSnapshot.isUnchangedComparisonsVisible).to.equal(false);
      expect(thirdNoDiffSnapshot.isUnchangedComparisonsVisible).to.equal(false);
      // Arrow to second snapshot.
      SnapshotList.typeDownArrow();
      wait();

      // We clicked on the first snapshot, so it's comparisons should always visible.
      // We arrowed to second snapshot so it's comparisons should be visible.
      expect(firstNoDiffSnapshot.isUnchangedComparisonsVisible).to.equal(true);
      expect(secondNoDiffSnapshot.isUnchangedComparisonsVisible).to.equal(true);
      expect(thirdNoDiffSnapshot.isUnchangedComparisonsVisible).to.equal(false);

      // Arrow to third-to-last snapshot.
      SnapshotList.typeDownArrow();
      wait();

      // We clicked on the first snapshot, so it's comparisons should always visible.
      // We previously arrowed to the second snapshot, so it's comparisons should stay visible.
      // We arrowed to third snapshot so it's comparisons should be visible.
      expect(firstNoDiffSnapshot.isUnchangedComparisonsVisible, 'one').to.equal(true);
      expect(secondNoDiffSnapshot.isUnchangedComparisonsVisible, 'two').to.equal(false);
      expect(thirdNoDiffSnapshot.isUnchangedComparisonsVisible, 'three').to.equal(true);
    });

    it('focuses snapshots on arrow presses', function() {
      const numRenderedSnapshots = SnapshotList.snapshots().count;
      expect(numRenderedSnapshots).to.equal(numSnapshots);

      // select first snapshot
      SnapshotList.typeDownArrow();
      wait();
      expect(SnapshotList.snapshots(0).isFocused).to.equal(true);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(false);
      expect(SnapshotList.snapshots(numRenderedSnapshots - 1).isFocused).to.equal(false);

      // select second snapshot
      SnapshotList.typeDownArrow();
      wait();
      expect(SnapshotList.snapshots(0).isFocused).to.equal(false);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(true);
      expect(SnapshotList.snapshots(numRenderedSnapshots - 1).isFocused).to.equal(false);

      // select first snapshot
      SnapshotList.typeUpArrow();
      wait();
      expect(SnapshotList.snapshots(0).isFocused).to.equal(true);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(false);
      expect(SnapshotList.snapshots(numRenderedSnapshots - 1).isFocused).to.equal(false);

      // wrap around to select last snapshot
      SnapshotList.typeUpArrow();
      wait();
      expect(SnapshotList.snapshots(0).isFocused).to.equal(false);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(false);
      expect(SnapshotList.snapshots(numRenderedSnapshots - 1).isFocused).to.equal(true);
      percySnapshot(this.test);

      // wrap around to select first snapshot
      SnapshotList.typeDownArrow();
      wait();
      expect(SnapshotList.snapshots(0).isFocused).to.equal(true);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(false);
      expect(SnapshotList.snapshots(numRenderedSnapshots - 1).isFocused).to.equal(false);
    });
  });

  describe('when there are more than 150 snapshots with diffs', function() {
    const numSnapshots = 151;

    beforeEach(function() {
      const stub = sinon.stub();
      const build = make('build', 'finished');

      const snapshots = makeList('snapshot', numSnapshots, 'withComparisons', {build});
      this.set('snapshots', snapshots);

      this.setProperties({
        snapshots,
        build,
        stub,
      });

      this.render(hbs`{{snapshot-list
        snapshots=snapshots
        build=build
        createReview=stub
        showSnapshotFullModalTriggered=stub
        updateActiveSnapshotId=stub
      }}`);
    });

    it('collapses all snapshots by default', function() {
      expect(SnapshotList.snapshots().count).to.equal(numSnapshots);
      SnapshotList.snapshots().forEach(snapshot => {
        expect(snapshot.isCollapsed).to.equal(true);
      });
      percySnapshot(this.test);
    });

    it('allows keyboard nav with up and down arrows', function() {
      SnapshotList.typeDownArrow();
      wait();

      expect(SnapshotList.snapshots(0).isExpanded).to.equal(true);
      expect(SnapshotList.snapshots(0).isFocused).to.equal(true);
      expect(SnapshotList.snapshots(1).isExpanded).to.equal(false);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(false);
      percySnapshot(this.test);

      SnapshotList.typeDownArrow();
      wait();

      expect(SnapshotList.snapshots(0).isExpanded).to.equal(false);
      expect(SnapshotList.snapshots(0).isFocused).to.equal(false);
      expect(SnapshotList.snapshots(1).isExpanded).to.equal(true);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(true);

      SnapshotList.typeUpArrow();
      wait();

      expect(SnapshotList.snapshots(0).isExpanded).to.equal(true);
      expect(SnapshotList.snapshots(0).isFocused).to.equal(true);
      expect(SnapshotList.snapshots(1).isExpanded).to.equal(false);
      expect(SnapshotList.snapshots(1).isFocused).to.equal(false);
    });
  });
});
