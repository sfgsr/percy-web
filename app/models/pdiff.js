import DS from 'ember-data';

export default DS.Model.extend({
  comparison: DS.belongsTo('comparison'),
  baseScreenshot: DS.belongsTo('screenshot'),
  otherScreenshot: DS.belongsTo('screenshot'),
  diffImage: DS.belongsTo('image'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
