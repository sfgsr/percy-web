import $ from 'jquery';
import {computed} from '@ember/object';
import {alias, gt, mapBy} from '@ember/object/computed';
import Component from '@ember/component';
import {inject as service} from '@ember/service';
import snapshotSort from 'percy-web/lib/snapshot-sort';

export default Component.extend({
  classNames: ['SnapshotList'],
  attributeBindings: ['data-test-snapshot-list'],
  'data-test-snapshot-list': true,

  snapshotComponents: null,
  activeSnapshotId: null,

  sortedSnapshots: computed('snapshots.[]', function() {
    return snapshotSort(this.get('snapshots').toArray());
  }),

  hideNoDiffs: gt('noDiffSnapshotsCount', 0),

  snapshotsWithDiffs: computed('sortedSnapshots', function() {
    return this.get('sortedSnapshots').filter(snapshot => {
      return snapshot.get('comparisons').isAny('isDifferent');
    });
  }),
  snapshotsWithoutDiffs: computed('snapshots', function() {
    return this.get('snapshots').filter(snapshot => {
      return snapshot.get('comparisons').isEvery('isSame');
    });
  }),
  noDiffSnapshotsCount: computed('snapshotsWithoutDiffs', function() {
    return this.get('snapshotsWithoutDiffs').reduce((total, snapshot) => {
      return total + snapshot.get('comparisons.length');
    }, 0);
  }),

  cachedSnapshotOrder: service(),
  computedSnapshots: computed(
    'build.isFinished',
    'hideNoDiffs',
    'snapshotsWithDiffs.@each.isApproved',
    'snapshotsWithoutDiffs.@each.isApproved',
    function() {
      // sort snapshots, then sort by approved vs unapproved
      const snapshots = this.get('hideNoDiffs')
        ? this.get('snapshotsWithDiffs')
        : [].concat(this.get('snapshotsWithDiffs'), this.get('snapshotsWithoutDiffs'));
      const approvedSnapshots = [];
      const unapprovedSnapshots = [];
      snapshots.forEach(snapshot => {
        if (snapshot.get('isApproved')) {
          approvedSnapshots.push(snapshot);
        } else {
          unapprovedSnapshots.push(snapshot);
        }
      });

      // recombine approved/unapproved into one list
      const orderedSnapshots = [].concat(unapprovedSnapshots, approvedSnapshots);
      return orderedSnapshots;
    },
  ),

  isDefaultExpanded: computed('snapshotsWithDiffs', function() {
    return this.get('snapshotsWithDiffs.length') < 150;
  }),

  actions: {
    updateActiveSnapshotId(newSnapshotId) {
      this.set('activeSnapshotId', newSnapshotId);
    },

    toggleNoDiffSnapshots() {
      this.toggleProperty('hideNoDiffs');
      this.get('cachedSnapshotOrder').setHideNoDiffsChanged();
    },
  },

  didInsertElement() {
    $(document).bind(
      'keydown.snapshots',
      function(e) {
        if (!this.get('isShowingModal')) {
          if (e.keyCode === 40) {
            // down arrow
            this.set('activeSnapshotId', this._calculateNewActiveSnapshotId({isNext: true}));
          } else if (e.keyCode === 38) {
            // up arrow
            this.set('activeSnapshotId', this._calculateNewActiveSnapshotId({isNext: false}));
          }
        }
      }.bind(this),
    );
  },
  willDestroyElement() {
    $(document).unbind('keydown.snapshots');
  },

  _snapshotIds: mapBy('computedSnapshots', 'id'),
  _numSnapshots: alias('computedSnapshots.length'),
  _calculateNewActiveSnapshotId({isNext = true} = {}) {
    let currentIndex = this.get('_snapshotIds').indexOf(this.get('activeSnapshotId'));

    // if we are moving forward and are on the last snapshot, wrap to beginning of list
    if (isNext && currentIndex === this.get('_numSnapshots') - 1) {
      currentIndex = -1;
    } else if (!isNext && currentIndex === 0) {
      // if we are moving backward and are on the first snapshot, wrap to end of list
      currentIndex = this.get('_numSnapshots');
    }

    const newIndex = isNext ? currentIndex + 1 : currentIndex - 1;
    return this.get('_snapshotIds')[newIndex];
  },
});
