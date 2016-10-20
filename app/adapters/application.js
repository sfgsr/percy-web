import DS from 'ember-data';
import utils from 'percy-web/lib/utils';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',

  isInvalid(status) {
    // NOTE: right now, the Percy API uses HTTP 400 when it should use HTTP 422 in many cases.
    // For that reason, we need to add 400 to the isInvalid check so that model.errors is populated
    // correctly.
    // TODO: when the API is changed to be more correct, we should drop this method.
    return status === 422 || status === 400;
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    // Use organization nested and singular URL for github-integration-request models.
    if (modelName === 'github-integration-request') {
      let organizationSlug = snapshot.record.get('_orgForAdapter.slug');
      return utils.buildApiUrl('githubIntegrationRequest', organizationSlug);
    }

    // Use the nested /organizations/:org_id/projects collection route when creating projects.
    if (requestType === 'createRecord' && modelName === 'project') {
      let organizationSlug = snapshot.record.get('organization.slug');
      return utils.buildApiUrl('projectsCollection', organizationSlug);
    }

    // Customize buildURL for models where we want to use the slug as the ID in the API URL, but
    // keep the internal ID stable. TODO: remove this when Ember Data fully supports JSON-API
    // self links.
    if (id && modelName === 'organization') {
      let changedAttributes = snapshot.changedAttributes();
      let changedSlug = changedAttributes.slug && changedAttributes.slug[0];
      let originalSlug = snapshot.record.get('slug');

      // Handle: 1) slug changed, 2) slug has not changed, 3) slug does not exist.
      id = changedSlug || originalSlug || id;
    }
    if (id && modelName === 'project') {
      let changedAttributes = snapshot.changedAttributes();
      let changedSlug = changedAttributes.slug && changedAttributes.slug[0];
      let originalSlug = snapshot.record.get('slug');

      // Handle: 1) slug changed, 2) slug has not changed, 3) slug does not exist.
      id = changedSlug || originalSlug || id;

      // Two cases need to be handled:
      // 1) On initial load, the project route contructs full slug id (org/project) based on the
      // URL. No organization relationship is present at that point, so we do nothing here.
      // 2) When the model is actually loaded, the full slug id now needs to be constructed for each
      // API call, so we add the organization slug here which completes the full slug.
      if (id.indexOf('/') === -1) {
        let organizationSlug = snapshot.record.get('organization.slug');
        id = `${organizationSlug}/${id}`;
      }
    }

    return this._super(modelName, id, snapshot, requestType, query);
  },
});

