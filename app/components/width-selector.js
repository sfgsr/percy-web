import Ember from 'ember';

export default Ember.Component.extend({
  selectedWidths: [],
  classNames: ['WidthSelector'],

  // Convenience property since the width selector is currently a single-select dropdown.
  primarySelectedWidth: Ember.computed('selectedWidths', function() {
    return this.get('selectedWidths').slice(-1)[0];
  }),

  actions: {
    updateSelectedWidths(value) {
      this.set('selectedWidths', []);
      this.get('selectedWidths').push(parseInt(value));

      let selectedWidths = this.get('selectedWidths');
      this.get('updateSelectedWidths')(selectedWidths.slice()); // Slice to copy array.
    }
  },
});
