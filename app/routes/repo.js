import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    var repoSlug = this.modelFor('namespace').get('id') + '/' + params.repo_id;
    return this.store.find('repo', repoSlug);
  },
  actions: {
    error(errors) {
      if (errors.errors[0].status === 'forbidden') {
        return this.transitionTo('repo-forbidden');
      }
    },
  },
});