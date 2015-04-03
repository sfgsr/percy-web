import DS from 'ember-data';

export default DS.Model.extend({
  comparison: DS.belongsTo('comparison'),
  baseScreenshot: DS.belongsTo('screenshot', {async: true}),
  headScreenshot: DS.belongsTo('screenshot', {async: true}),
  diffImage: DS.belongsTo('image'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
