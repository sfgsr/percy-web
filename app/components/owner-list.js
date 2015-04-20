import Ember from 'ember';

export default Ember.Component.extend({
  repos: null,
  currentOwner: null,
  classes: null,

  classNames: ['OwnerList'],
  classNameBindings: ['classes'],

  owners: function() {
    // TODO(fotinakis): kill this when we have real owner objects.
    var currentOwners = [];
    return this.get('repos').map(function(repo) {
      var login = repo.get('ownerLogin');
      if (currentOwners.indexOf(login) === -1) {
        currentOwners.push(login);
        return {login: login};
      }
    }).uniq().removeObject(undefined);
  }.property('repos'),

  actions: {
    selectOwner: function(owner) {
      this.sendAction('selectOwner', owner);
    },
  }
});
