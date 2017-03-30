import Ember from 'ember';

export default Ember.Component.extend({
  comparison: null,

  // The selected column mode of the comparison list.
  // So that comparison viewers can know if they are inside a n-column layout.
  selectedNumColumns: 1,
  isFullWidthOnlyMode: Ember.computed.equal('selectedNumColumns', 1),
  isMultiColumnMode: Ember.computed.gt('selectedNumColumns', 1),

  showNoDiffSnapshot: false,
  isOverlayEnabled: true,
  isDefaultExpanded: true,
  isFocus: false,
  isExpanded: Ember.computed('isDefaultExpanded', function() {
    // TODO: this is just to break the binding with isDefaultExpanded,
    // fix this when migrating to later ember versions with default one-way bindings.
    return this.get('isDefaultExpanded');
  }),
  isNotExpanded: Ember.computed.not('isExpanded'),
  isActionable: Ember.computed.or('isNotExpanded', 'isMultiColumnMode'),

  comparisonUrl: Ember.computed(function() {
    return `?comparison=${this.get('comparison.id')}`;
  }),

  classNames: ['ComparisonViewer'],
  classNameBindings: [
    'isFocus:ComparisonViewer--focus',
    'isExpanded::ComparisonViewer--collapsed',
    'isActionable:ComparisonViewer--actionable',
  ],

  didInsertElement() {
    this._super(...arguments);
    this.send('registerChild', this);
  },
  willDestroyElement() {
    this._super(...arguments);
    this.send('unregisterChild', this);
  },
  click() {
    if (this.get('isActionable')) {
      this.send('selectChild');
    }
  },
  actions: {
    selectChild() {
      this.set('showNoDiffSnapshot', true);
      if (this.get('isNotExpanded')) {
        this.set('isExpanded', true);
      }
      this.get('selectChild')(this);
    },
    registerChild() {
      this.get('registerChild')(this);
    },
    unregisterChild() {
      this.get('unregisterChild')(this);
    },
    toggleOverlay() {
      this.toggleProperty('isOverlayEnabled');
    },
    toggleNoDiffResource() {
      this.toggleProperty('showNoDiffSnapshot');
    },
  },
});
