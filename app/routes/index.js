import Route from '@ember/routing/route';
import ResetScrollMixin from '../mixins/reset-scroll';

export default Route.extend(ResetScrollMixin, {
  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      // TODO: Add organization tracking
      this.analytics.track('Home Viewed');
    },
  },
});
