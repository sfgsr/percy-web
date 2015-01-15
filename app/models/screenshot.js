import DS from 'ember-data';

export default DS.Model.extend({
  repo: DS.belongsTo('repo', {async: true}),
  image: DS.belongsTo('image'),
  name: DS.attr(),
});
