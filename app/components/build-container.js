import {or} from '@ember/object/computed';
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

  currentPosition: null,

  shouldPollForUpdates: or('build.isPending', 'build.isProcessing'),

  pollRefresh() {
    this.get('build')
      .reload()
      .then(build => {
        if (build.get('isFinished')) {
          this.set('isSnapshotsPending', true);
          build
            .get('snapshots')
            .reload()
            .finally(() => {
              this.set('isSnapshotsPending', false);
            });
        }
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
  },
});
