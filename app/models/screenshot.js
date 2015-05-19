import DS from 'ember-data';

export default DS.Model.extend({
  snapshot: DS.belongsTo('snapshot'),
  image: DS.belongsTo('image'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
