export default function() {
  this.namespace = '/api/v1';
  this.logging = true;
  this.timing = 400;  // simulate network delay

  this.get('/users/:id');
  this.get('/organizations/:id');
  this.get('/users/:id/organizations', (schema, request) => {
    let user = schema.users.find(request.params.id);
    let organizationUsers = schema.organizationUsers.where({userId:user.id});
    let organizationIds = organizationUsers.models.map((organizationUser) => { return organizationUser.organizationId; });
    return schema.organizations.where({id: organizationIds});
  });
  this.get('/organizations/:id/organization-users', (schema, request) => {
    // TODO filter current user with ?filter=current-user-only
    let organization = schema.organizations.find(request.params.id);
    return schema.organizationUsers.where({organizationId: organization.id});
  });
}
