import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from 'percy-web/mixins/reset-scroll';

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  params: {},
  queryParams: {
    comparisonMode: {as: 'mode'},
  },

  isModalShowing: true,

  model(params /*transition*/) {
    this.set('params', params);
    let buildId = this.modelFor('organization.project.builds.build').get('id');
    return this.store.findRecord('build', buildId);
  },
  afterModel(resolvedModel) {
    // Avoids race condition to get snapshots on build in components. Because the underlying
    // lookup is an async relationship, the get triggers a promise which allows route cycle
    // blocking behavior.
    return resolvedModel.get('snapshots');
  },
  setupController(controller, model) {
    this._super(...arguments);

    let params = this.get('params');

    controller.setProperties({
      build: model,
      snapshotId: params.snapshot_id,
      snapshotSelectedWidth: params.width,
      comparisonMode: params.comparisonMode,
    });
  },
  actions: {
    tmp() {
      console.log('tmp');
    },
    didTransition() {
      this._super(...arguments);
      // this.send('updateModalState', true);

      let build = this.modelFor(this.routeName);
      let organization = build.get('project.organization');
      let eventProperties = {
        project_id: build.get('project.id'),
        project_slug: build.get('project.slug'),
        build_id: build.get('id'),
        snapshot_id: this.get('params').snapshot_id,
      };
      this.analytics.track('Snapshot Fullscreen Viewed', organization, eventProperties);
    },
    updateComparisonMode(value) {
      this.controllerFor(this.routeName).set('comparisonMode', value.toString());
    },
    transitionRouteToWidth(snapshot, width, comparisonMode) {
      this.transitionTo('organization.project.builds.build.snapshot', snapshot.id, width, {
        queryParams: {mode: comparisonMode},
      });
    },
  },
});
