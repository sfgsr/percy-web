import DS from 'ember-data';

export default DS.Model.extend({
  token: DS.attr(),
  role: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  project: DS.belongsTo('project', {inverse: 'tokens'}),
});
