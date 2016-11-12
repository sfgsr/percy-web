import DS from 'ember-data';

export default DS.Model.extend({
  githubId: DS.attr('number'),
  name: DS.attr(),
  slug: DS.attr(),
  htmlUrl: DS.attr(),
  isPrivate: DS.attr('boolean'),
  description: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
