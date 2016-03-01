import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['BuildContainer'],
  selectedWidths: [],
  actions: {
    updateSelectedWidths: function(widths) {
      this.set('selectedWidths', widths);
    },
  },
});
