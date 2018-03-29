import $ from 'jquery';
import {alias, lt, mapBy} from '@ember/object/computed';
import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['SnapshotList'],
  attributeBindings: ['data-test-snapshot-list'],
  'data-test-snapshot-list': true,
  isUnchangedSnapshotsVisible: false,

  snapshotsChanged: null,
  snapshotsUnchanged: null,
  activeSnapshotId: null,
  showDiffs: null,
  toggleShowDiffs: null,

  isDefaultExpanded: lt('snapshotsChanged.length', 150),

  actions: {
    updateActiveSnapshotId(newSnapshotId) {
      this.set('activeSnapshotId', newSnapshotId);
    },
    toggleUnchangedSnapshotsVisible() {
      this.toggleProperty('isUnchangedSnapshotsVisible');
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
          } else if (e.keyCode === 68) {
            // d key
            e.preventDefault();
            this.get('toggleShowDiffs')();
            // console.log('Diff toggled with keyboard');
            this.analytics.track('Diff toggled with keyboard');
          }
        }
      }.bind(this),
    );
  },
  willDestroyElement() {
    $(document).unbind('keydown.snapshots');
  },

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
