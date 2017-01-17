import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    activeComparisonId: {as: 'comparison', replace: true}
  },
  afterModel(model) {
    model.reload().then((model) => {
      if (!model.get('isExpired')) {
        // Force reload because these async-hasMany's won't reload themselves if the build's
        // state has changed, such as going from processing --> finished and we don't want to show
        // fewer comparisons than there are.
        model.get('comparisons').reload();
      }
    });
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      // Clear the query parameter when exiting the route.
      controller.set('activeComparisonId', undefined);
    }
  },
  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      let build = this.modelFor(this.routeName);
      let organization = build.get('project.organization');
      let eventProperties = {
        project_id: build.get('project.id'),
        project_slug: build.get('project.slug'),
        build_id: build.get('id'),
        state: build.get('state')
      };
      this.analytics.track('Build Viewed', organization, eventProperties);
    },
    updateActiveComparisonId(comparisonId) {
      this.set('controller.activeComparisonId', comparisonId);
    }
  }
});
