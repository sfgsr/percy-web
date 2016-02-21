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

  // defaultWidth: function() {
  //   return Math.max(this.get('build.comparisonWidths'));
  // }.property('build.comparisionWidths'),
  // init: function() {
  //   this._super(...arguments);

  //   // TODO: this is crap and doesn't get
  //   this.get('selectedWidths').push(this.get('defaultWidth'));
  //   this.send('updateSelectedWidths', this.get('defaultWidth'));
  // },

});
