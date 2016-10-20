import DS from 'ember-data';

export default DS.Model.extend({
  githubAccountAvatarUrl: DS.attr(),
  githubHtmlUrl: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
