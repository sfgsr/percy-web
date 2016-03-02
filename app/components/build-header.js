import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['BuildHeader'],

  isBuildInfoVisible: false,
  actions: {
    toggleBuildInfo: function() {
      this.set('isBuildInfoVisible', !this.get('isBuildInfoVisible'))
    },
  },
});
