import Ember from 'ember';

export default Ember.Component.extend({
  repos: null,
  classes: null,

  classNames: ['RepoList'],
  classNameBindings: ['classes'],
  actions: {
    // Delegate up to application route.
    enableRepo: function(repo) {
      this.sendAction('enableRepo', repo);
    },
  },
});
