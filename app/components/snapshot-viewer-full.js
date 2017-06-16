import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['SnapshotViewerFull'],
  build: null,
  comparisonMode: null,
  snapshotId: null,
  galleryMap: ['base', 'diff', 'head'],
  galleryIndex: Ember.computed('comparisonMode', function() {
    return this.get('galleryMap').indexOf(this.get('comparisonMode'));
  }),

  snapshot: Ember.computed('build.snapshots.[]', 'snapshotId', function() {
    return this.get('build.snapshots').findBy('id', this.get('snapshotId'));
  }),
  buildWidths: Ember.computed.alias('build.comparisonWidths'),
  selectedComparison: Ember.computed('snapshot', 'snapshotSelectedWidth', function() {
    let comparisons = this.get('snapshot.comparisons') || [];
    let width = parseInt(this.get('snapshotSelectedWidth'), 10);
    return comparisons.findBy('width', width);
  }),
  snapshotSelectedWidth: Ember.computed.reads('selectedComparison.width'),
  didRender() {
    this._super(...arguments);

    // Autofocus component for keyboard navigation
    this.$().attr({tabindex: 1});
    this.$().focus();
  },
  actions: {
    updateSelectedWidth(value) {
      let comparisons = this.get('snapshot.comparisons') || [];
      let comparison = comparisons.findBy('width', parseInt(value, 10));

      this.set('selectedComparison', comparison);
      this.set('snapshotSelectedWidth', value);

      this.sendAction('transitionRouteToWidth',
        this.get('snapshot'),
        value,
        this.get('comparisonMode')
      );
    },
    cycleComparisonMode(keyCode) {
      let galleryMap = this.get('galleryMap');
      let galleryLength = this.get('galleryMap.length');
      let directional = keyCode === 39 ? 1 : -1;
      let galleryIndex = this.get('galleryIndex');
      let newIndex = ((galleryIndex + directional) % galleryLength + galleryLength) % galleryLength;

      this.sendAction('updateComparisonMode', galleryMap[newIndex]);
    },
  },
  keyDown(event) {
    let buildId = this.get('build.id');
    let snapshotId = this.get('snapshot.id');

    if (event.keyCode === 27) {
      this.sendAction('closeSnapshotFullModal', buildId, snapshotId);
    }

    if (event.keyCode === 39 || event.keyCode === 37) {
      if (!this.get('selectedComparison') || this.get('selectedComparison.wasAdded')) {
        return;
      }
      this.send('cycleComparisonMode', event.keyCode);
    }
  },
});
