import $ from 'jquery';
import {computed} from '@ember/object';
<<<<<<< HEAD
import {alias, lt, filterBy, mapBy} from '@ember/object/computed';
=======
>>>>>>> 40af86ef... caching works for reload case
import Component from '@ember/component';

export default Component.extend({
  classNames: ['SnapshotList'],
  attributeBindings: ['data-test-snapshot-list'],
  'data-test-snapshot-list': true,
  isUnchangedSnapshotsVisible: false,

<<<<<<< HEAD
=======
  snapshotsChanged: null,
  snapshotsUnchanged: null,

  activeSnapshotId: null,
  lastSnapshotIndex: null,
  selectedSnapshotIndex: -1,
>>>>>>> 40af86ef... caching works for reload case
  snapshotComponents: null,
  activeSnapshotId: null,

<<<<<<< HEAD
  sortedSnapshots: computed('snapshots.[]', function() {
    return snapshotSort(this.get('snapshots').toArray());
  }),
  snapshotsUnreviewed: filterBy('sortedSnapshots', 'isUnreviewed', true),
  snapshotsApproved: filterBy('sortedSnapshots', 'isApprovedByUserEver', true),
  snapshotsUnchanged: filterBy('sortedSnapshots', 'isUnchanged', true),

  isDefaultExpanded: lt('snapshotsUnreviewed.length', 150),

  actions: {
    updateActiveSnapshotId(newSnapshotId) {
      this.set('activeSnapshotId', newSnapshotId);
    },

    toggleNoDiffSnapshots() {
      this.toggleProperty('hideNoDiffs');
      this.get('cachedSnapshotOrder').setHideNoDiffsChanged();
    },
  },
=======
  isDefaultExpanded: computed('snapshotsChanged', function() {
    return this.get('snapshotsChanged.length') < 150;
  }),
>>>>>>> 40af86ef... caching works for reload case

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

<<<<<<< HEAD
  _snapshotIds: mapBy('computedSnapshots', 'id'),
  _numSnapshots: alias('computedSnapshots.length'),
=======
  _allVisibleSnapshots: computed(
    'snapshotsChanged.[]',
    'snapshotsUnchanged.[]',
    'isUnchangedSnapshotsVisible',
    function() {
      if (this.get('isUnchangedSnapshotsVisible')) {
        return [].concat(this.get('snapshotsChanged'), this.get('snapshotsUnchanged'));
      } else {
        return this.get('snapshotsChanged');
      }
    },
  ),

  _snapshotIds: mapBy('_allVisibleSnapshots', 'id'),
  _numSnapshots: alias('_allVisibleSnapshots.length'),
>>>>>>> 3246cbf2... clean up
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
