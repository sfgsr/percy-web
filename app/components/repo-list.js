import Ember from 'ember';

export default Ember.Component.extend({
  repos: null,
  filterByOwner: null,
  classes: null,

  filteredRepos: Ember.computed.filter('repos', function(repo) {
    return repo.get('ownerLogin') === this.get('filterByOwner.login');
  }).property('repos', 'filterByOwner'),

  classNames: ['RepoList'],
  classNameBindings: ['classes'],
});
