import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {task, timeout} from 'ember-concurrency';
const POLLING_INTERVAL_SECONDS = 1;
const MAX_UPDATE_POLLING_REQUESTS = 600;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.computed.alias('session.data.authenticated.user'),

  queryParams: {
    installationId: {
      as: 'installation_id',
    },
  },

  installationId: null,
  runningTask: null,

  startPollingForUpdates: function() {
    this.set('runningTask', this.get('pollForUpdatesTask').perform());
  },

  deactivate: function() {
    if (this.get('runningTask')) {
      this.get('runningTask').cancel();
    }
  },

  pollForUpdatesTask: task(function*() {
    this.set('numPollRequests', 0);
    while (this.get('numPollRequests') < MAX_UPDATE_POLLING_REQUESTS) {
      this.incrementProperty('numPollRequests');

      // Find the organization the user added the GitHub integration to,
      // and then redirect them back to the org setup flow
      // or to settings if they already have projects
      this.get('currentUser.organizations')
        .reload()
        .then(orgs => {
          // Attempt to get the organization that matches the installationId
          // This may fail if we haven't received the webhook yet, or a fake param is used
          let organization = orgs.find(
            org => org.get('githubIntegration.githubInstallationId') == this.get('installationId'),
          );

          if (organization) {
            this.get('runningTask').cancel();
            // If the organization has projects redirect to the settings page,
            // else redirect to add a project page.
            organization.get('projects').then(projects => {
              if (projects.get('length') > 0) {
                this.replaceWith('organizations.organization.settings', organization.get('slug'));
              } else {
                this.replaceWith('organization.index', organization.get('slug'));
              }
            });
          }
        });

      if (Ember.testing) {
        return;
      }

      yield timeout(POLLING_INTERVAL_SECONDS * 1000);
    }
  }).drop(),

  model(params) {
    this.set('installationId', params.installationId);
    this.startPollingForUpdates();
  },
});
