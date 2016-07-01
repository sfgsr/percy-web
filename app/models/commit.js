import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr(),
  shaShort: Ember.computed('sha', function() {
    var sha = this.get('sha');
    return sha && sha.slice(0, 7);
  }),

  message: DS.attr(),
  authorName: DS.attr(),
  committerName: DS.attr(),
  committedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
