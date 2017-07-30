import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['SnapshotList'],

  activeSnapshotId: null,
  buildContainerSelectedWidth: null,
  buildWidths: [],
  lastSnapshotIndex: null,
  selectedSnapshotIndex: -1,
  snapshotComponents: null,
  updateActiveSnapshotId: null,
  updateSelectedWidth: null,

  sortedSnapshots: Ember.computed('snapshots.[]', 'buildContainerSelectedWidth', function() {
    let snapshots = this.get('snapshots');
    let width = parseInt(this.get('buildContainerSelectedWidth'));

    function comparisonAtCurrentWidth(snapshot) {
      return snapshot.get('comparisons').findBy('width', width);
    }

    return snapshots.sort(function(a, b) {
      let comparisonForA = comparisonAtCurrentWidth(a);
      let comparisonForB = comparisonAtCurrentWidth(b);

      // First-level sort: priortize snapshots with comparisons at the current width to the top.
      if (comparisonForA && !comparisonForB) {
        // First snapshot has a comparison at the current width.
        return -1;
      } else if (!comparisonForA && comparisonForB) {
        // Second snapshot has a comparison at the current width.
        return 1;
      } else if (comparisonForA && comparisonForB) {
        // Both snapshots have a comparison for the current width, sort by diff percentage.
        return comparisonForB.get('smartDiffRatio') - comparisonForA.get('smartDiffRatio');
      }

      // Second sort: by diff ratio across all widths.
      function maxDiffRatioAnyWidth(comparisons) {
        return Math.max.apply(null, comparisons.mapBy('smartDiffRatio').filter(x => x));
      }
      let maxComparisonDiffA = maxDiffRatioAnyWidth(a.get('comparisons'));
      let maxComparisonDiffB = maxDiffRatioAnyWidth(b.get('comparisons'));

      // Sorts descending.
      return maxComparisonDiffB + maxComparisonDiffA;
    });
  }),
  hideNoDiffs: Ember.computed('noDiffSnapshotsCount', function() {
    let noDiffsCount = this.get('noDiffSnapshotsCount');
    let activeSnapshotId = this.get('activeSnapshotId');
    let activeSnapshotIsNoDiff = this.get('snapshotsWithoutDiffs').findBy('id', activeSnapshotId);

    return noDiffsCount > 0 && activeSnapshotIsNoDiff === undefined;
  }),
  snapshotsWithDiffs: Ember.computed('sortedSnapshots', function() {
    return this.get('sortedSnapshots').filter(snapshot => {
      return snapshot.get('comparisons').isAny('isDifferent');
    });
  }),
  snapshotsWithoutDiffs: Ember.computed('snapshots', function() {
    return this.get('snapshots').filter(snapshot => {
      return snapshot.get('comparisons').isEvery('isSame');
    });
  }),
  noDiffSnapshotsCount: Ember.computed('snapshotsWithoutDiffs', function() {
    return this.get('snapshotsWithoutDiffs').reduce((total, snapshot) => {
      return total + snapshot.get('comparisons.length');
    }, 0);
  }),
  computedSnapshots: Ember.computed(
    'hideNoDiffs',
    'snapshotsWithDiffs.[]',
    'snapshotsWithoutDiffs.[]',
    function() {
      if (this.get('hideNoDiffs')) {
        return this.get('snapshotsWithDiffs');
      } else {
        return [].concat(this.get('snapshotsWithDiffs'), this.get('snapshotsWithoutDiffs'));
      }
    },
  ),
  isDefaultExpanded: Ember.computed('snapshotsWithDiffs', function() {
    return this.get('snapshotsWithDiffs.length') < 150;
  }),
  didInsertElement() {
    Ember.$(document).bind(
      'keydown.snapshots',
      function(e) {
        if (!this.get('isShowingModal')) {
          if (e.keyCode === 39) {
            // right arrow
            this.send('nextSnapshot');
          } else if (e.keyCode === 37) {
            // left arrow
            this.send('previousSnapshot');
          }
        }
      }.bind(this),
    );
  },
  willDestroyElement() {
    Ember.$(document).unbind('keydown.snapshots');
  },
  scrollToChild: function(component) {
    Ember.$('.BuildContainer-body').animate({scrollTop: component.$().get(0).offsetTop - 10}, 0);
  },
  actions: {
    registerChild(component) {
      if (!this.get('snapshotComponents')) {
        this.set('snapshotComponents', Ember.ArrayProxy.create({content: Ember.A()}));
      }
      this.get('snapshotComponents').pushObject(component);

      // While we are registering children components, notice if the current query parameter matches
      // and, if so, setup to scroll to that component after load.
      if (this.get('activeSnapshotId')) {
        let index = this.get('snapshotComponents.length') - 1;

        if (this.get('activeSnapshotId') == this.get('sortedSnapshots').objectAt(index).get('id')) {
          this.send('changeSelectedSnapshotIndex', () => index);

          // After the list is inserted and rendered, scroll to this child component.
          Ember.run.next(() => {
            this.scrollToChild(component);
          });
        }
      }
    },
    unregisterChild(component) {
      // Assume all components are being destroyed and we should reset the selection. TODO: improve.
      this.set('selectedSnapshotIndex', 0);
      this.get('snapshotComponents').removeObject(component);
    },
    selectChild(component) {
      this.send('changeSelectedSnapshotIndex', () => component.get('listIndex'));
    },
    nextSnapshot() {
      this.send('changeSelectedSnapshotIndex', lastIndex => lastIndex + 1);
      let lastIndex = this.get('selectedSnapshotIndex');

      Ember.run.next(() => {
        this.scrollToChild(this.get('snapshotComponents').objectAtContent([lastIndex]));
      });
    },
    previousSnapshot() {
      this.send('changeSelectedSnapshotIndex', lastIndex => lastIndex - 1);
      let lastIndex = this.get('selectedSnapshotIndex');

      Ember.run.next(() => {
        this.scrollToChild(this.get('snapshotComponents').objectAtContent([lastIndex]));
      });
    },
    changeSelectedSnapshotIndex(computeNextIndex) {
      let lastIndex = this.get('selectedSnapshotIndex');
      let newIndex = computeNextIndex(lastIndex);
      let computedSnapshotsLen = this.get('computedSnapshots.length');
      let newIndexWrapped = (newIndex + computedSnapshotsLen) % computedSnapshotsLen;
      this.set('lastSnapshotIndex', lastIndex);
      this.set('selectedSnapshotIndex', newIndexWrapped);
      this.send('updateSelectedSnapshot');
    },
    updateSelectedSnapshot() {
      let snapshotComponents = this.get('snapshotComponents');

      if (snapshotComponents.length == 0) {
        return;
      }

      let selectedIndex = this.get('selectedSnapshotIndex');
      let selectedComponent = snapshotComponents.objectAt(selectedIndex);
      let lastIndex = this.get('lastSnapshotIndex');

      this.get('updateActiveSnapshotId')(selectedComponent.get('snapshot.id'));

      // Expand the selected component.
      selectedComponent.get('setAsSelected').call(selectedComponent);

      // Grab the last component, if it exists, and different
      if (lastIndex !== -1 && lastIndex != selectedIndex) {
        let lastComponent = snapshotComponents.objectAt(lastIndex);
        lastComponent.set('isExpanded', this.get('isDefaultExpanded'));
        lastComponent.set('isFocus', false);
      }
    },
    toggleNoDiffSnapshots() {
      this.toggleProperty('hideNoDiffs');
      window.scrollTo(0, 0);
    },
  },
});
