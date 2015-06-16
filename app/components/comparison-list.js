import Ember from 'ember';

export default Ember.Component.extend({
  comparisons: null,
  comparisonComponents: null,

  selectedComparisonIndex: -1,
  lastComparisonIndex: null,

  isDefaultExpanded: function() {
    return this.get('comparisons.length') < 100;
  }.property('comparisons'),

  sortedComparisons: Ember.computed.sort('comparisons', 'comparisonSortProperties'),
  comparisonSortProperties: ['isDifferent:desc', 'pdiff.diffPercentageFull:desc'],

  classNames: ['ComparisonList'],

  setupKeyHandlers: function() {
    Ember.$(document).bind('keydown.comparisons', function(e) {
      if (e.keyCode === 74) {  // "j"
        this.send('nextComparison');
      } else if (e.keyCode === 75) {  // "k"
        this.send('previousComparison');
      }
    }.bind(this));
  }.on('didInsertElement'),
  destroyKeyHandlers: function() {
    Ember.$(document).unbind('keydown.comparisons');
  }.on('willDestroyElement'),

  actions: {
    registerChild: function(component) {
      if (!this.get('comparisonComponents')) {
        this.set('comparisonComponents', []);
      }
      this.get('comparisonComponents').unshift(component);
    },
    nextComparison: function() {
      var index = this.get('selectedComparisonIndex');
      this.set('lastComparisonIndex', index);

      if (index === this.get('comparisons.length') - 1) {
        // Wrap around to beginning.
        this.set('selectedComparisonIndex', 0);
      } else {
        this.set('selectedComparisonIndex', index + 1);
      }
      this.send('updateSelectedComparison');
    },
    previousComparison: function() {
      var index = this.get('selectedComparisonIndex');
      this.set('lastComparisonIndex', index);

      if (index <= 0) {
        // Wrap around to end.
        this.set('selectedComparisonIndex', this.get('comparisons.length') - 1);
      } else {
        this.set('selectedComparisonIndex', index - 1);
      }
      this.send('updateSelectedComparison');
    },
    updateSelectedComparison: function() {
      var comparisonComponents = this.get('comparisonComponents');
      var selectedIndex = this.get('selectedComparisonIndex');
      var selectedComponent = comparisonComponents[selectedIndex];
      var lastIndex = this.get('lastComparisonIndex');

      // Expand the selected component.
      selectedComponent.set('isExpanded', true);

      // Grab the last component, if it exists.
      if (lastIndex !== -1) {
        var lastComponent = comparisonComponents[lastIndex];
        lastComponent.set('isExpanded', this.get('isDefaultExpanded'));
      }

      // Wait for the views changes above to render, then calculate the right scroll position.
      Ember.run.scheduleOnce('afterRender', function() {
        window.scrollTo(0, selectedComponent.$().offset().top - 75);
      });
    },
  }
});
