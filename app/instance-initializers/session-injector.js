export default {
  name: 'session-injector',
  initialize: function(application) {
    application.registry.injection('controller', 'session', 'service:session');
  },
};