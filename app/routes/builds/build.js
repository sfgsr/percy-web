import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('build', params.build_id);
  },
  afterModel: function(build) {
    // The model hook may not be called if transition happened by a link-to helper which provides
    // the model already. However, that model may not have all the correct relationships loaded for
    // this page, so we refresh the model manually.
    build.reload();
  },
});
