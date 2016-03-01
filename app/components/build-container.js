import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['BuildContainer'],
  selectedWidths: [1280],
  actions: {
    updateSelectedWidths: function(widths) {
      this.set('selectedWidths', widths);
    },
  },
});
