import Ember from 'ember';

export default Ember.Component.extend({
  snapshot: null,

  classNames: ['SnapshotViewer'],
  buildContainerSelectedWidth: null,
  snapshotSelectedWidth: Ember.computed('buildContainerSelectedWidth', {
    get() {
      return this.get('buildContainerSelectedWidth');
    },
    set(_, value) {
      return value;
    }
  }),
  selectedComparison: Ember.computed('snapshot', 'snapshotSelectedWidth', function() {
    let width = this.get('snapshotSelectedWidth');
    let comparisons = this.get('snapshot.comparisons') || [];
    return comparisons.findBy('width', parseInt(width, 10));
  }),

  // The selected column mode of the comparison list.
  // So that comparison viewers can know if they are inside a n-column layout.
  selectedNumColumns: 1,
  isFullWidthOnlyMode: Ember.computed.equal('selectedNumColumns', 1),
  isMultiColumnMode: Ember.computed.gt('selectedNumColumns', 1),

  classNameBindings: [
    'isFocus:SnapshotViewer--focus',
    'isExpanded::SnapshotViewer--collapsed',
    'isActionable:SnapshotViewer--actionable',
  ],
  isDefaultExpanded: true,
  isFocus: false,
  isExpanded: Ember.computed('isDefaultExpanded', function() {
    // TODO: this is just to break the binding with isDefaultExpanded,
    // fix this when migrating to later ember versions with default one-way bindings.
    return this.get('isDefaultExpanded');
  }),
  isNotExpanded: Ember.computed.not('isExpanded'),
  isActionable: Ember.computed.or('isNotExpanded', 'isMultiColumnMode'),

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
      this.set('snapshotSelectedWidth', value);
      this.get('snapshotWidthChangeTriggered')();
    }
  },
});
