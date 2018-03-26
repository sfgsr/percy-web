import Controller from '@ember/controller';

export default Controller.extend({
  // // set by initializeSnapshotOrdering
  // snapshots: null,
  // sortedSnapshots: computed('snapshots.[]', function() {
  //   if (!this.get('snapshots')) {
  //     return [];
  //   }
  //   return snapshotSort(this.get('snapshots').toArray());
  // }),
  // snapshotsUnreviewed: filterBy('sortedSnapshots', 'isUnreviewed', true),
  // snapshotsApproved: filterBy('sortedSnapshots', 'isApprovedByUserEver', true),
  // snapshotsChanged: null, // Manually managed by initializeSnapshotOrdering.
  // snapshotsUnchanged: filterBy('sortedSnapshots', 'isUnchanged', true),
  // // This breaks the binding for snapshotsChanged, specifically so that when a user clicks
  // // approve, the snapshot stays in place until reload.
  // //
  // // Called by the route when entered and snapshots load.
  // // Called by polling when snapshots reload after build is finished.
  // initializeSnapshotOrdering(snapshots) {
  //   this.set('snapshots', snapshots);
  //   let orderedSnapshots = [].concat(
  //     this.get('snapshotsUnreviewed'),
  //     this.get('snapshotsApproved'),
  //   );
  //   this.set('snapshotsChanged', orderedSnapshots);
  //   this.set('isSnapshotsLoading', false);
  // },
});
