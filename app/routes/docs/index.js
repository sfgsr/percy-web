import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition() {
      this._super(...arguments);
      this.analytics.track('Docs Page Viewed', null, {path: '/docs'});
    },
  },
});
