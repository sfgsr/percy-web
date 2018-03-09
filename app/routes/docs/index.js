import Route from '@ember/routing/route';
import ResetScrollMixin from 'percy-web/mixins/reset-scroll';

export default Route.extend(ResetScrollMixin, {
  actions: {
    didTransition() {
      this._super(...arguments);
      this.analytics.track('Docs Page Viewed', null, {path: '/docs'});
    },
  },
});
