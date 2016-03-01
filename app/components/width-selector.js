import Ember from 'ember';

export default Ember.Component.extend({
  selectedWidths: [],
  actions: {
    updateSelectedWidths: function(value) {
      this.set('selectedWidths', []);
      this.get('selectedWidths').push(parseInt(value));

      let selectedWidths = this.get('selectedWidths');
      this.get('updateSelectedWidths')(selectedWidths.slice()); // Slice to copy array.
    }
  },
});
