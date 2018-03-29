import Controller from '@ember/controller';
import snapshotSort from 'percy-web/lib/snapshot-sort';
import {filterBy} from '@ember/object/computed';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Controller.extend({
  analytics: service(),
  // set by initializeSnapshotOrdering
  snapshots: null,
  sortedSnapshots: computed('snapshots.[]', function() {
    if (!this.get('snapshots')) {
      return [];
    }
    return snapshotSort(this.get('snapshots').toArray());
  }),
  snapshotsUnreviewed: filterBy('sortedSnapshots', 'isUnreviewed', true),
  snapshotsApproved: filterBy('sortedSnapshots', 'isApprovedByUserEver', true),

  snapshotsChanged: null, // Manually managed by initializeSnapshotOrdering.
  snapshotsUnchanged: filterBy('sortedSnapshots', 'isUnchanged', true),

  showDiffs: true,

  actions: {
    toggleShowDiffs(options = {}) {
      let eventTrigger = options.eventTrigger;
      this.toggleProperty('showDiffs');

      let build = this.get('build');
      let organization = build.get('project.organization');
      let eventProperties = {
        project_id: build.get('project.id'),
        project_slug: build.get('project.slug'),
        build_id: build.get('id'),
        trigger: eventTrigger,
      };
      this.get('analytics').track('Diff Toggled', organization, eventProperties);
    },
  },

  // This breaks the binding for snapshotsChanged, specifically so that when a user clicks
  // approve, the snapshot stays in place until reload.
  //
  // Called by the route when entered and snapshots load.
  // Called by polling when snapshots reload after build is finished.
  initializeSnapshotOrdering(snapshots) {
    this.set('snapshots', snapshots);
    let orderedSnapshots = [].concat(
      this.get('snapshotsUnreviewed'),
      this.get('snapshotsApproved'),
    );

    this.set('snapshotsChanged', orderedSnapshots);
    this.set('isSnapshotsLoading', false);
  },
});
