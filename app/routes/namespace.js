import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    // Since namespaces are dumb and only contain an ID, which we have already, create and push the
    // record client-side instead of fetching anything.
    return this.store.push({data: {id: params.namespace_id, type: 'namespace'}});
  },
});
