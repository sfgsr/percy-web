import Ember from 'ember';

export default Ember.Component.extend({
  repos: null,
  filterByOwner: null,
  classes: null,

  onCurrentUserOwner: function() {
    // TODO: why can't we use Ember.computed.equal with these?
    return this.get('session.secure.user.login') === this.get('filterByOwner.login');
  }.property('session.secure.user', 'filterByOwner'),

  filteredRepos: Ember.computed.filter('repos', function(repo) {
    return repo.get('ownerLogin') === this.get('filterByOwner.login');
  }).property('repos', 'filterByOwner'),

  classNames: ['RepoList'],
  classNameBindings: ['classes'],
});
