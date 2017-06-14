import Ember from 'ember';
import {task, timeout} from 'ember-concurrency';

const POLLING_INTERVAL_SECONDS = 5;
const MAX_UPDATE_POLLING_REQUESTS = 2000;

export default Ember.Component.extend({
  build: null,
  activeSnapshotId: null,
  updateActiveSnapshotId: null,
  classNames: ['BuildContainer'],
  maxWidth: Ember.computed.max('build.comparisonWidths'),
  buildContainerSelectedWidth: Ember.computed.oneWay('maxWidth'),
  noWidthSelected: false,

  selectedNumColumns: 1,
  showComparisons: Ember.computed.or('build.isPending', 'build.isProcessing', 'build.isFinished'),

  shouldPollForUpdates: Ember.computed.or('build.isPending', 'build.isProcessing'),

  // TODO(@rosschapman): only necessary because of funky API
  // Builds collection of snapshots with comparisons for display on build page
  snapshots: Ember.computed('build.comparisons', function() {
    let comparisons = this.get('build.comparisons');
    let collection = [];

    let snapshots = comparisons.map((comparison) => comparison.get('headSnapshot')).filter(x => x);
    let uniqueSnapshots = [...new Set(snapshots)];

    if (uniqueSnapshots.length > 0) {
      uniqueSnapshots.forEach((snapshot) => {
        collection.push(snapshot);
      });
    }
    return collection;
  }),

  // Task to poll for updates for pending builds.
  runningTask: null,
  maybeStartPolling: Ember.on('init', function() {
    if (this.get('shouldPollForUpdates')) {
      this.set('runningTask', this.get('pollForUpdatesTask').perform());
    }
  }),
  pollForUpdatesTask: task(function * () {
    this.set('numPollRequests', 0);
    while (this.get('numPollRequests') < MAX_UPDATE_POLLING_REQUESTS) {
      this.incrementProperty('numPollRequests');
      this.get('build').reload().then((build) => {
        build.get('comparisons').reload();
        if (!this.get('shouldPollForUpdates')) {
          this.get('runningTask').cancel();
        }
        // Cancel after 1 iteration if running tests - otherwise acceptance tests break
        // ember-concurrency is planning on adding a better way to cancel tasks during testing
        // https://ember-concurrency.com/#/docs/testing-debugging
        if (Ember.testing) {
          this.get('runningTask').cancel();
        }
      });
      yield timeout(POLLING_INTERVAL_SECONDS * 1000);
    }
  }).drop(),

  restoreSelectedModeColumns: Ember.on('init', function() {
    let numColumns = localStorage.getItem('numColumns');

    // Cleanup bad data (not a number) in localStorage.
    if (numColumns && Number(numColumns) === numColumns && numColumns % 1 !== 0) {
      localStorage.deleteItem('numColumns');
      return;
    }
    if (numColumns) {
      this.send('selectNumColumns', parseInt(numColumns));
    }
  }),
  actions: {
    updateActiveSnapshotId(comparisonId) {
      this.get('updateActiveSnapshotId')(comparisonId);
    },
    updateSelectedWidth(width) {
      // Clear the query parameter selected snapshot.
      this.sendAction('updateActiveSnapshotId', undefined);

      this.set('noWidthSelected', false);
      if (width) {
        this.set('buildContainerSelectedWidth', width);
      }
      window.scrollTo(0, 0);
    },
    selectNumColumns(numColumns) {
      this.set('selectedNumColumns', numColumns);

      try {
        localStorage.setItem('numColumns', numColumns);
      } catch (_) {
        // Safari throws errors while accessing localStorage in private mode.
      }
    },
    showSupport() {
      this.sendAction('showSupport');
    },
    snapshotWidthChangeTriggered() {
      this.set('noWidthSelected', true);
    },
  },
});
