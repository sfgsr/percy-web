import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ComparisonViewerFull'],
  comparison: null,
  isBase: Ember.computed.equal('comparisonMode', 'base'),
  isHead: Ember.computed.equal('comparisonMode', 'head'),
  isDiff: Ember.computed.equal('comparisonMode', 'diff'),
  headImage: Ember.computed.reads('comparison.headScreenshot.image'),
  diffImage: Ember.computed.reads('comparison.diffImage'),
  baseImage: Ember.computed.reads('comparison.baseScreenshot.image'),
  click() {
    if (!this.get('comparison') || this.get('comparison.wasAdded')) {
      return;
    }
    this.sendAction('cycleComparisonMode', 39);
  },
});
