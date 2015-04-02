import DS from 'ember-data';

export default DS.Model.extend({
  githubId: DS.attr('number'),
  name: DS.attr(),
  ownerLogin: DS.attr(),
  slug: DS.attr(),
  isPrivate: DS.attr('boolean'),
  isEnabled: DS.attr('boolean'),
  htmlUrl: DS.attr(),
  description: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  builds: DS.hasMany('build', {async: true}),
});
