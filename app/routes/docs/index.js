import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    didTransition() {
      this._super(...arguments);
      this.analytics.track('Docs Page Viewed', null, {path: '/docs'});
    },
  },
});
