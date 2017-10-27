import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  snapshotSelectedWidth: null,
  comparisons: [],
  buildWidths: [],
  updateSelectedWidth() {},
  classNames: ['ComparisonSwitcher'],
  selectedWidth: computed('snapshotSelectedWidth', {
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
