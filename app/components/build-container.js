import {or} from '@ember/object/computed';
import Component from '@ember/component';
import PollingMixin from 'percy-web/mixins/polling';

export default Component.extend(PollingMixin, {
  build: null,
  classNames: ['BuildContainer'],
  classNameBindings: [
    'classes',
    'isShowingModal:BuildContainer--snapshotModalOpen:BuildContainer--snapshotModalClosed',
  ],

  currentPosition: null,
  snapshotsChanged: null,
  snapshotsUnchanged: null,

  shouldShowLoadingSpinner: or('build.isRunning', 'snapshots.isPending'),

  shouldPollForUpdates: or('build.isPending', 'build.isProcessing'),

  pollRefresh() {
    this.get('build')
      .reload()
      .then(build => {
        if (build.get('isFinished')) {
          // this.set('snapshots', build.get('snapshots').reload());
        }
      });
  },

  actions: {
    showSnapshotFullModalTriggered(snapshotId, snapshotSelectedWidth) {
      this.sendAction('openSnapshotFullModal', snapshotId, snapshotSelectedWidth);
    },

    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
