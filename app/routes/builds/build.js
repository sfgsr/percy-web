import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findOne('build', params.build_id, {
      include: [
        'approved-by',
        'commit',
        'base-build',
        'base-build.commit',
        'comparisons',
        'comparisons.pdiff',
        'comparisons.base-resource',
        'comparisons.head-resource',
      ].join(',')
    });
  },
});
