import Ember from 'ember';

export default Ember.Component.extend({
  comparison: null,
  parentComparisonList: null,

  showNoDiffSnapshot: false,
  isOverlayEnabled: true,
  isDefaultExpanded: true,
  isExpanded: function() {
    // TODO: this is just to break the binding with isDefaultExpanded,
    // fix this when migrating to later ember versions with default one-way bindings.
    return this.get('isDefaultExpanded');
  }.property(),

  classNames: ['ComparisonViewer'],
  classNameBindings: [
    'isExpanded::ComparisonViewer--collapsed',
    'isExpanded::ComparisonViewer--actionable',
  ],

  _register: function() {
    var parent = this.get('parentComparisonList');
    if (parent) {
      parent.send('registerChild', this);
    }
  }.on('didInsertElement'),
  click: function() {
    this.set('isExpanded', true);
  },
  actions: {
    toggleOverlay: function() {
      this.set('isOverlayEnabled', !this.get('isOverlayEnabled'));
    },
    toggleNoDiffResource: function() {
      this.set('showNoDiffSnapshot', !this.get('showNoDiffSnapshot'));
    },
  },
});
