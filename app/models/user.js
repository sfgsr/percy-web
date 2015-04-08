import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr(),
  name: DS.attr(),
  avatarUrl: DS.attr(),
  githubId: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
