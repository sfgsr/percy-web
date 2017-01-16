import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  actions: {
    didTransition() {
      // Track Pricing Viewed without the organization for now.
      this.analytics.track('Pricing Viewed');
    },
  }
});
