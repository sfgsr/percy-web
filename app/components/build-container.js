import {max, oneWay, or} from '@ember/object/computed';
import Component from '@ember/component';
import PollingMixin from 'percy-web/mixins/polling';

export default Component.extend(PollingMixin, {
  build: null,
  activeSnapshotId: null,
  updateActiveSnapshotId: null,
  classNames: ['BuildContainer'],
  classNameBindings: [
    'classes',
    'isShowingModal:BuildContainer--snapshotModalOpen:BuildContainer--snapshotModalClosed',
  ],
  maxWidth: max('build.comparisonWidths'),
  buildContainerSelectedWidth: oneWay('maxWidth'),
  currentPosition: null,

  showComparisons: or('build.isPending', 'build.isProcessing', 'build.isFinished'),
  shouldPollForUpdates: or('build.isPending', 'build.isProcessing'),

  pollRefresh() {
    this.get('build')
      .reload()
      .then(build => {
        // TODO replace with snapshots?
        build.get('comparisons').reload();
      });
  },

  actions: {
    showSnapshotFullModalTriggered(snapshotId, snapshotSelectedWidth) {
      this.sendAction('openSnapshotFullModal', snapshotId, snapshotSelectedWidth);
    },
    updateActiveSnapshotId(comparisonId) {
      this.get('updateActiveSnapshotId')(comparisonId);
    },

    showSupport() {
      this.sendAction('showSupport');
    },
    snapshotWidthChangeTriggered() {
      this.set('noWidthSelected', true);
    },
  },
});
