import DS from 'ember-data';

export default DS.Model.extend({
  // resource: DS.belongsTo('resource'),
  image: DS.belongsTo('image'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
