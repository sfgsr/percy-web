import Mirage from 'ember-cli-mirage';

export default function() {
  this.namespace = '/api/v1';

  this.get('/users/:id');
  this.get('/organizations/:slug', function (schema, request) {
    return schema.organizations.findBy({slug: request.params.slug});
  });
  this.patch('/organizations/:slug', function (schema, request) {
    let attrs = this.normalizedRequestAttrs();
    if (! attrs.slug.match(/^[a-zA-Z][a-zA-Z_]*[a-zA-Z]$/)) {
      return new Mirage.Response(400, {}, {errors: [
            {status: "bad_request"},
            {source: {pointer: "/data/attributes/slug"},detail: "Slug must only contain letters, numbers, dashes, and cannot begin or end with a dash."}
          ]});
    }
    let organization = schema.organizations.findBy({slug: request.params.slug});
    organization.update(attrs);
    return organization;
  });
  this.post('/organizations', function (schema) {
    let attrs = this.normalizedRequestAttrs();
    attrs.slug = 'new_org';
    let currentUser = schema.users.first();
    let result = schema.organizations.create(attrs);
    schema.organizationUsers.create({userId: currentUser.id, organizationId: result.id});
    return result;
  });
  this.get('/users/:id/organizations', (schema, request) => {
    let user = schema.users.find(request.params.id);
    let organizationUsers = schema.organizationUsers.where({userId:user.id});
    let organizationIds = organizationUsers.models.map((organizationUser) => { return organizationUser.organizationId; });
    return schema.organizations.where({id: organizationIds});
  });
  this.get('/organizations/:slug/organization-users', (schema, request) => {
    // TODO handle ?filter=current-user-only
    let organization = schema.organizations.findBy({slug: request.params.slug});
    return schema.organizationUsers.where({organizationId: organization.id});
  });
  this.get('/organizations/:id/projects', (schema, request) => {
    let organization = schema.organizations.findBy({id: request.params.id});
    return schema.projects.where({organizationId: organization.id});
  });
  this.get('/projects/:full_slug/', (schema, request) => {
    let fullSlug = decodeURIComponent(request.params.full_slug);
    return schema.projects.findBy({fullSlug: fullSlug});
  });
  this.get('/projects/:organization_slug/:project_slug/builds', (schema, request) => {
    let project = schema.projects.findBy({fullSlug:`${request.params.organization_slug}/${request.params.project_slug}`});
    return schema.builds.where({projectId: project.id});
  });
  this.get('/invites/:id');
  this.patch('/invites/:id', function (schema, request) {
    let invite = schema.invites.find(request.params.id);
    let attrs = this.normalizedRequestAttrs();
    invite.update(attrs);
    return invite;
  });

}
