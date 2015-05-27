import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  repo: DS.belongsTo('repo', {async: true}),
  buildNumber: DS.attr('number'),

  commit: DS.belongsTo('commit'),
  baseBuild: DS.belongsTo('build'),
  comparisons: DS.hasMany('comparison', {async: true}),
  snapshots: DS.hasMany('snapshot', {async: true}),

  isPullRequest: DS.attr('boolean'),
  pullRequestNumber: DS.attr('number'),
  pullRequestTitle: DS.attr(),

  approvedAt: DS.attr('date'),
  approvedBy: DS.belongsTo('user'),

  state: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  isPending: Ember.computed.equal('state', 'pending'),
  isProcessing: Ember.computed.equal('state', 'processing'),
  isFinished: Ember.computed.equal('state', 'finished'),

  isApproved: function() {
    return !!this.get('approvedAt');
  }.property('approvedAt'),

  reloadAll: function() {
    this.store.findOne('build', this.get('id'));
  },
});
