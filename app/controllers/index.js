import Ember from 'ember';

export default Ember.Controller.extend({
  loginUrl: function() {
    return 'http://localhost:3000/auth/github?redirect_to=' + window.location.href + 'fotinakis/';
  }.property(),
});