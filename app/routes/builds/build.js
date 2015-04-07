import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findOne('build', params.build_id, {
      include: 'commit,base-build,comparisons,comparisons.pdiff,comparisons.base-resource,comparisons.head-resource',
    });
  },
});