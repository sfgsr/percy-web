import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';
import sinon from 'sinon';
import DS from 'ember-data';
import {defer} from 'rsvp';
import BuildPage from 'percy-web/tests/pages/build-page';

describe('Integration: BuildContainer', function() {
  setupComponentTest('build-container', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    BuildPage.setContext(this);
  });

  describe('snapshot display during different build states', function() {
    beforeEach(function() {
      const build = make('build');
      const snapshotsChanged = [make('snapshot', 'withComparisons', {build})];
      const snapshotsUnchanged = [make('snapshot', 'withNoDiffs', {build})];
      const stub = sinon.stub();

      this.setProperties({build, snapshotsChanged, snapshotsUnchanged, stub});

      // Override the pollRefresh method for the test. This does not happen IRL,
      // but we can't have the component make requests in this integration test
      this.render(hbs`{{build-container
        build=build
        snapshotsChanged=snapshotsChanged
        snapshotsUnchanged=snapshotsUnchanged
        createReview=stub
        pollRefresh=stub
        showSupport=stub
      }}`);
    });

    it('does not display snapshots while build is processing', function() {
      this.set('build.state', 'processing');

      percySnapshot(this.test.fullTitle());
      expect(BuildPage.snapshotList.isVisible).to.equal(false);
    });

    it('does not display snapshots while build is pending', function() {
      this.set('build.state', 'pending');

      percySnapshot(this.test.fullTitle());
      expect(BuildPage.snapshotList.isVisible).to.equal(false);
    });

    it('does not display snapshots when build is failed', function() {
      const failedBuild = make('build', 'failed');
      this.set('build', failedBuild);

      percySnapshot(this.test.fullTitle());
      expect(BuildPage.snapshotList.isVisible).to.equal(false);
    });

    it('does not display snapshots when build is expired', function() {
      this.set('build.state', 'expired');

      percySnapshot(this.test.fullTitle());
      expect(BuildPage.snapshotList.isVisible).to.equal(false);
    });
  });

  it('does not display snapshots when the snapshots are pending', function() {
    const build = make('build', 'finished');
    const snapshotsChanged = DS.PromiseArray.create({promise: defer().promise});
    const stub = sinon.stub();

    this.setProperties({build, snapshotsChanged, stub});

    // Override the pollRefresh method for the test. This does not happen IRL,
    // but we can't have the component make requests in this integration test
    this.render(hbs`{{build-container
      build=build
      snapshotsChanged=snapshotsChanged
      createReview=stub
      pollRefresh=stub
    }}`);

    percySnapshot(this.test.fullTitle());
    expect(BuildPage.snapshotList.isVisible).to.equal(false);
  });

  it('displays snapshots when build is finished', function() {
    const build = make('build', 'finished');
    const diffSnapshot = make('snapshot', 'withComparisons', {build});
    const sameSnapshot = make('snapshot', 'withNoDiffs', {build});
    const stub = sinon.stub();
    this.setProperties({
      build,
      stub,
      snapshotsChanged: [diffSnapshot],
      snapshotsUnchanged: [sameSnapshot],
    });

    // Override the pollRefresh method for the test. This does not happen IRL,
    // but we can't have the component make requests in this integration test
    this.render(hbs`{{build-container
      build=build
      snapshotsChanged=snapshotsChanged
      snapshotsUnchanged=snapshotsUnchanged
      createReview=stub
      pollRefresh=stub
    }}`);
    percySnapshot(this.test.fullTitle());

    expect(BuildPage.snapshotList.isVisible).to.equal(true);
    expect(BuildPage.snapshotList.snapshots().count).to.equal(1);
    expect(BuildPage.snapshotList.isNoDiffsBatchVisible).to.equal(true);
  });
});
