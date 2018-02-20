import {not, alias, or} from '@ember/object/computed';
import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  snapshot: null,
  classNames: ['SnapshotViewer mb-2'],
  classNameBindings: [
    'isFocus:SnapshotViewer--focus',
    'isExpanded::SnapshotViewer--collapsed',
    'isActionable:SnapshotViewer--actionable',
  ],
  attributeBindings: ['data-test-snapshot-viewer'],
  'data-test-snapshot-viewer': true,

  registerChild() {},
  unregisterChild() {},
  selectChild() {},

  comparisons: alias('snapshot.comparisons'),

  snapshotSelectedWidth: or('userSelectedWidth', 'defaultWidth'),
  userSelectedWidth: null,

  defaultWidth: or('snapshot.maxComparisonWidthWithDiff', 'snapshot.maxComparisonWidth'),

  selectedComparison: computed('snapshot.widestComparison', 'snapshotSelectedWidth', function() {
    return (
      this.get('snapshot').comparisonForWidth(this.get('snapshotSelectedWidth')) ||
      this.get('snapshot.widestComparison')
    );
  }),

  isDefaultExpanded: true,
  isFocus: false,
  isExpanded: computed('isDefaultExpanded', 'snapshot.isApproved', 'build.isApproved', function() {
    if (this.get('build.isApproved')) {
      return true;
    } else if (this.get('snapshot.isApproved')) {
      return false;
    } else {
      return this.get('isDefaultExpanded');
    }
  }),
  isNotExpanded: not('isExpanded'),
  isActionable: alias('isNotExpanded'),

  didInsertElement() {
    this._super(...arguments);
    this.send('registerChild', this);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.send('unregisterChild', this);
  },

  click() {
    this.send('selectChild');
  },

  setAsSelected() {
    this.set('showNoDiffSnapshot', true);
    this.set('isFocus', true);

    if (this.get('isNotExpanded')) {
      this.set('isExpanded', true);
    }
  },

  actions: {
    selectChild() {
      this.get('setAsSelected').call(this);
      this.get('selectChild')(this);
    },

    registerChild() {
      this.get('registerChild')(this);
    },

    unregisterChild() {
      this.get('unregisterChild')(this);
    },

    updateSelectedWidth(value) {
      this.set('userSelectedWidth', value);
    },
  },
});
