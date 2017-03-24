import Ember from 'ember';

export default Ember.Component.extend({
  selectedWidths: null,
  selectedNumColumns: null,
  comparisons: null,
  comparisonComponents: null,
  activeComparisonId: null,
  updateActiveComparisonId: null,

  selectedComparisonIndex: -1,
  lastComparisonIndex: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let comparisons = this.get('comparisons');
    let noDiffComparisons = this.get('comparisons').filterBy('isSame');
    let hasNoDiffs = noDiffComparisons.length >= 0;
    let filteredComparisons = hasNoDiffs ? comparisons.filterBy('isDifferent') : comparisons;

    this.setProperties({
      hideNoDiffs: hasNoDiffs,
      filteredComparisons: filteredComparisons
    });
  },

  isDefaultExpanded: Ember.computed('comparisons', function() {
    return this.get('comparisons.length') < 150;
  }),

  sortedComparisons: Ember.computed.sort('filteredComparisons', 'comparisonSortProperties'),
  comparisonSortProperties: ['isDifferent:desc', 'pdiff.diffPercentageFull:desc'],

  classNames: ['ComparisonList'],
  classNameBindings: ['comparisonListMode'],
  comparisonListMode: Ember.computed('selectedNumColumns', function() {
    return 'ComparisonList--' + this.get('selectedNumColumns') + 'col';
  }),
  setupKeyHandlers: Ember.on('didInsertElement', function() {
    Ember.$(document).bind('keydown.comparisons', function(e) {
      if (e.keyCode === 39) {  // right arrow
        this.send('nextComparison');
      } else if (e.keyCode === 37) {  // left arrow
        this.send('previousComparison');
      }
    }.bind(this));
  }),
  destroyKeyHandlers: Ember.on('willDestroyElement', function() {
    Ember.$(document).unbind('keydown.comparisons');
  }),
  scrollToChild: function(component) {
    window.scrollTo(0, component.$().offset().top - 250);
  },
  actions: {
    registerChild(component) {
      if (!this.get('comparisonComponents')) {
        this.set('comparisonComponents', Ember.ArrayProxy.create({content: Ember.A()}));
      }
      this.get('comparisonComponents').pushObject(component);

      // While we are registering children components, notice if the current query parameter matches
      // and, if so, setup to scroll to that component after load.
      if (this.get('activeComparisonId')) {
        let index = this.get('comparisonComponents.length') - 1;
        if (this.get('activeComparisonId') == this.get('sortedComparisons').objectAt(index).get('id')) {
          this.send('changeSelectedComparisonIndex', () => index);

          // Make sure we're in full-width mode because we are going scroll to a single comparison.
          this.get('selectNumColumns')(1);

          // After the list is inserted and rendered, scroll to this child component.
          Ember.run.next(() => {
            this.scrollToChild(component);
          });
        }
      }
    },
    unregisterChild(component) {
      // Assume all components are being destroyed and we should reset the selection. TODO: improve.
      this.set('selectedComparisonIndex', 0);
      this.get('comparisonComponents').removeObject(component);
    },
    selectChild(component) {
      // Flip back to full-width mode.
      this.get('selectNumColumns')(1);

      this.send('changeSelectedComparisonIndex', () => component.get('listIndex'));
      Ember.run.next(() => {
        this.scrollToChild(component);
      });
    },
    nextComparison() {
      this.send('changeSelectedComparisonIndex', lastIndex => lastIndex + 1);
    },
    previousComparison() {
      this.send('changeSelectedComparisonIndex', lastIndex => lastIndex - 1);
    },
    changeSelectedComparisonIndex(computeNextIndex) {
      var lastIndex = this.get('selectedComparisonIndex');
      let newIndex = computeNextIndex(lastIndex);
      let newIndexWrapped = (newIndex + this.get('comparisons.length')) % this.get('comparisons.length');
      this.set('lastComparisonIndex', lastIndex);
      this.set('selectedComparisonIndex', newIndexWrapped);
      this.send('updateSelectedComparison');
    },
    updateSelectedComparison() {
      var comparisonComponents = this.get('comparisonComponents');
      var selectedIndex = this.get('selectedComparisonIndex');
      var selectedComponent = comparisonComponents.objectAt(selectedIndex);
      var lastIndex = this.get('lastComparisonIndex');

      this.get('updateActiveComparisonId')(selectedComponent.get('comparison.id'));

      // Expand the selected component.
      selectedComponent.set('isExpanded', true);
      selectedComponent.set('showNoDiffSnapshot', true);
      selectedComponent.set('isFocus', true);

      // Grab the last component, if it exists, and different
      if (lastIndex !== -1 && lastIndex != selectedIndex) {
        var lastComponent = comparisonComponents.objectAt(lastIndex);
        lastComponent.set('isExpanded', this.get('isDefaultExpanded'));
        lastComponent.set('isFocus', false);
      }

      this.scrollToChild(selectedComponent);
    },
    showAllSnapshots() {
      this.set('filteredComparisons', this.get('comparisons'));
      this.set('hideNoDiffs', false);
    },
  }
});
