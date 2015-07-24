export default {
  name: 'session-injector',
  after: 'simple-auth',
  initialize: function(_, application) {
    // The ember-cli-simple-auth package will already inject the simple auth session into many
    // other types of objects, but we also need the session in the adapter so that headers
    // can be set.
    application.inject('adapter:application', 'session', 'simple-auth-session:main');

    // Having the current session in a model is a bit of an anti-pattern but we make it available
    // anyway. Use sparingly.
    application.inject('model', 'session', 'simple-auth-session:main');
  },
};
