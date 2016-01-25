import DS from 'ember-data';

export default DS.Model.extend({
  snapshot: DS.belongsTo('snapshot', {async: false}),
  image: DS.belongsTo('image', {async: false}),
  lossyImage: DS.belongsTo('image', {async: false}),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
