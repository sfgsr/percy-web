import Ember from 'ember';

export default Ember.Component.extend({
  snapshotSelectedWidth: null,
  comparisons: [],
  buildWidths: [],
  updateSelectedWidth() {},
  classNames: ['ComparisonSwitcher'],
  selectedWidth: Ember.computed('snapshotSelectedWidth', {
    get() {
      return this.get('snapshotSelectedWidth');
    },
    set(_, value) {
      return value;
    },
  }),
  actions: {
    updateSelectedWidth(value) {
      if (value === parseInt(this.get('selectedWidth'))) {
        return;
      }

      this.set('selectedWidth', value);
      this.get('updateSelectedWidth')(value);
    },
  },
});
