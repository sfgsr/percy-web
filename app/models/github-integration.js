import DS from 'ember-data';

export default DS.Model.extend({
  githubInstallationId: DS.attr(),
  githubAccountAvatarUrl: DS.attr(),
  githubHtmlUrl: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
