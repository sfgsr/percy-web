import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  comparison: DS.belongsTo('comparison'),
  baseScreenshot: DS.belongsTo('screenshot', {async: false}),
  headScreenshot: DS.belongsTo('screenshot', {async: false}),
  diffImage: DS.belongsTo('image', {async: false}),
  diffRatio: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  diffPercentage: function() {
    return this.get('diffPercentageFull').toFixed(2);
  }.property('diffRatio'),
  diffPercentageFull: function() {
    return this.get('diffRatio') * 100;
  }.property('diffRatio'),

  isSame: Ember.computed.equal('diffPercentageFull', 0),
  isDifferent: Ember.computed.not('isSame'),
});
