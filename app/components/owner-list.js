import Ember from 'ember';

export default Ember.Component.extend({
  repos: null,
  currentOwner: null,
  classes: null,

  classNames: ['OwnerList'],
  classNameBindings: ['classes'],

  owners: function() {
    // TODO(fotinakis): refactor this craziness when we have real owner objects.
    var currentOwners = [];
    var result = this.get('repos').map(function(repo) {
      var login = repo.get('ownerLogin');
      if (currentOwners.indexOf(login) === -1) {
        currentOwners.push(login);
        return {login: login};
      }
    }).uniq().removeObject(undefined).sort(function(first, second) {
      // Always sort current user's org to the top.
      if (first.login === this.get('session.secure.user.login')) {
        return -1;
      }
      // Sort everything else alphabetically.
      return (first.login > second.login) ? 1 : -1;
    }.bind(this));
    return result;
  }.property('repos', 'currentOwner'),

  actions: {
    selectOwner: function(owner) {
      this.sendAction('selectOwner', owner);
    },
  }
});
