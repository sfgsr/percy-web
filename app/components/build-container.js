import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['BuildContainer'],
  selectedWidths: Ember.computed('build.comparisonWidths', function() {
    // Use the largest width by default.
    return this.get('build.comparisonWidths').slice(-1);
  }),
  selectedNumColumns: 1,

  showComparisons: Ember.computed.or('build.isPending', 'build.isProcessing', 'build.isFinished'),

  visibleComparisons: Ember.computed('build.comparisons', 'selectedWidths', function() {
    return this.get('build.comparisons').filter((comparison) => {
      return this.get('selectedWidths').indexOf(comparison.get('width')) !== -1;
    });
  }),

  restoreSelectedModeColumns: Ember.on('init', function() {
    let numColumns = localStorage.getItem('numColumns');

    // Cleanup bad data (not a number) in localStorage.
    if (numColumns && Number(numColumns) === numColumns && numColumns % 1 !== 0) {
      localStorage.deleteItem('numColumns');
      return;
    }
    if (numColumns) {
      this.send('selectNumColumns', parseInt(numColumns));
    }
  }),
  actions: {
    updateSelectedWidths(widths) {
      this.set('selectedWidths', widths);
    },
    selectNumColumns(numColumns) {
      this.set('selectedNumColumns', numColumns);
      localStorage.setItem('numColumns', numColumns);
    },
    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
