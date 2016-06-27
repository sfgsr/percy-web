import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['BuildContainer'],
  selectedWidths: function() {
    // Use the largest width by default.
    return this.get('build.comparisonWidths').slice(-1);
  }.property('build.comparisonWidths'),
  selectedNumColumns: 4,

  // TODO(fotinakis): remove these on #projectification.
  session: Ember.inject.service(),
  currentSubscription: Ember.computed.alias('session.data.authenticated.user.subscription'),

  showComparisons: Ember.computed.or('build.isPending', 'build.isProcessing', 'build.isFinished'),

  visibleComparisons: function() {
    return this.get('build.comparisons').filter((comparison) => {
      return this.get('selectedWidths').indexOf(comparison.get('width')) !== -1;
    });
  }.property('build.comparisons', 'selectedWidths'),

  restoreSelectedModeColumns: function() {
    let numColumns = localStorage.getItem('numColumns');

    // Cleanup bad data (not a number) in localStorage.
    if (numColumns && Number(numColumns) === numColumns && numColumns % 1 !== 0) {
      localStorage.deleteItem('numColumns');
      return;
    }
    if (numColumns) {
      this.send('selectNumColumns', parseInt(numColumns));
    }
  }.on('init'),
  actions: {
    updateSelectedWidths: function(widths) {
      this.set('selectedWidths', widths);
    },
    selectNumColumns: function(numColumns) {
      this.set('selectedNumColumns', numColumns);
      localStorage.setItem('numColumns', numColumns);
    },
  },
});
