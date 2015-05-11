import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findOne('build', params.build_id);
  },
});
