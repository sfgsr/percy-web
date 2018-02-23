import Controller from '@ember/controller';
import snapshotSort from 'percy-web/lib/snapshot-sort';
import {filterBy} from '@ember/object/computed';
import {computed} from '@ember/object';

export default Controller.extend({
  // Set by route when entered and snapshots load.
  // Set by the polling when snapshots load after build is finished.
  snapshots: null,

  sortedSnapshots: computed('snapshots.[]', function() {
    if (!this.get('snapshots')) {
      return [];
    }
    return snapshotSort(this.get('snapshots').toArray());
  }),
  snapshotsUnreviewed: filterBy('sortedSnapshots', 'isUnreviewed', true),
  snapshotsApproved: filterBy('sortedSnapshots', 'isApprovedByUserEver', true),

  snapshotsChanged: null,
  snapshotsUnchanged: filterBy('sortedSnapshots', 'isUnchanged', true),

  initializeSnapshotOrdering() {
    let orderedSnapshots = [].concat(
      this.get('snapshotsUnreviewed'),
      this.get('snapshotsApproved'),
    );
    this.set('snapshotsChanged', orderedSnapshots);
  },
});
