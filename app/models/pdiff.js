import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  diffImage: DS.belongsTo('image', {async: false}),
  diffRatio: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  isSame: Ember.computed.equal('diffRatio', 0),
  isDifferent: Ember.computed.not('isSame'),
});
