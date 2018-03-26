import {or} from '@ember/object/computed';
import Component from '@ember/component';
import PollingMixin from 'percy-web/mixins/polling';

export default Component.extend(PollingMixin, {
  build: null,
  classNames: ['BuildContainer'],

  snapshotsChanged: null,
  snapshotsUnchanged: null,

  shouldPollForUpdates: or('build.isPending', 'build.isProcessing'),

  pollRefresh() {
    this.get('build')
      .reload()
      .then(build => {
        if (build.get('isFinished')) {
          let snapshotsPromise = build.get('snapshots').reload();
          snapshotsPromise.then(snapshots => {
            this.get('initializeSnapshotOrdering')(snapshots);
          });
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
