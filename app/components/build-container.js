import Ember from 'ember';
import {task, timeout} from 'ember-concurrency';

const POLLING_INTERVAL_SECONDS = 5;
const MAX_UPDATE_POLLING_REQUESTS = 2000;

export default Ember.Component.extend({
  build: null,
  activeComparisonId: null,
  updateActiveComparisonId: null,
  classNames: ['BuildContainer'],
  selectedWidths: Ember.computed(
    'build.comparisonWidths', 'build.comparisons', 'activeComparisonId', function() {
    let activeComparisonId = this.get('activeComparisonId');
    if (activeComparisonId) {
      let activeComparison = this.get('build.comparisons').find(
              comparison => comparison.id === activeComparisonId);
      if (activeComparison) {
        return [activeComparison.get('width')];
      }
    }
    // Use the largest width by default.
    return this.get('build.comparisonWidths').slice(-1);
  }),
  selectedNumColumns: 1,
  showComparisons: Ember.computed.or('build.isPending', 'build.isProcessing', 'build.isFinished'),
  visibleComparisons: Ember.computed('build.comparisons', 'selectedWidths', function() {
    return this.get('build.comparisons').filter((comparison) => {
      return this.get('selectedWidths').indexOf(comparison.get('width')) !== -1;
    });
  }),

  // Task to poll for updates for pending builds.
  runningTask: null,
  maybeStartPolling: Ember.on('init', function() {
    if (this.get('build.isPending') || this.get('build.isProcessing')) {
      this.set('runningTask', this.get('pollForUpdatesTask').perform());
    }
  }),
  pollForUpdatesTask: task(function * () {
    this.set('numPollRequests', 0);
    while (this.get('numPollRequests') < MAX_UPDATE_POLLING_REQUESTS) {
      this.incrementProperty('numPollRequests');
      this.get('build').reload().then((build) => {
        if (this.get('build.isPending') || this.get('build.isProcessing')) {
          build.get('comparisons').reload();
        } else {
          build.get('comparisons').reload();
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
    updateActiveComparisonId(comparisonId) {
      this.get('updateActiveComparisonId')(comparisonId);
    },
    updateSelectedWidths(widths) {
      this.set('selectedWidths', widths);
      this.get('updateActiveComparisonId')(undefined);
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
  },
});
