import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('build', params.build_id);
  },
  afterModel(model) {
    if (model.get('isFinished')) {
      model.get('snapshots').then(snapshots => {
        this.send('setInitialSnapshots', snapshots);
      });
    }
  },

  actions: {
    setInitialSnapshots(snapshots) {
      let controller = this.controllerFor(this.routeName);
      controller.set('snapshots', snapshots);
      controller.initializeSnapshotOrdering();
    },
    didTransition() {
      this._super.apply(this, arguments);

      let build = this.modelFor(this.routeName);

      let organization = build.get('project.organization');
      let eventProperties = {
        project_id: build.get('project.id'),
        project_slug: build.get('project.slug'),
        build_id: build.get('id'),
        state: build.get('state'),
      };
      this.analytics.track('Build Viewed', organization, eventProperties);
    },

    updateModalState(state) {
      this.get('currentModel').set('isShowingModal', state);
    },
    openSnapshotFullModal(snapshotId, snapshotSelectedWidth) {
      let build = this.modelFor(this.routeName);
      let organization = build.get('project.organization');
      let eventProperties = {
        project_id: build.get('project.id'),
        project_slug: build.get('project.slug'),
        build_id: build.get('id'),
        snapshot_id: snapshotId,
      };
      this.analytics.track('Snapshot Fullscreen Selected', organization, eventProperties);

      this.send('updateModalState', true);
      this.transitionTo(
        'organization.project.builds.build.snapshot',
        snapshotId,
        snapshotSelectedWidth,
        {
          queryParams: {mode: 'diff'},
        },
      );
    },
    closeSnapshotFullModal(buildId) {
      this.send('updateModalState', false);
      this.transitionTo('organization.project.builds.build', buildId);
    },

    createReview(action, build, snapshots) {
      const review = this.get('store').createRecord('review', {
        build: build,
        snapshots: snapshots,
      });
      return review.save().then(() => {
        const build = this.modelFor(this.routeName);
        build.get('snapshots').reload();
        build.reload();
      });
    },
  },
});
