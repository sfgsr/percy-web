export default {
  name: 'session-injector',
  initialize: function(appInstance) {
    appInstance.inject('controller', 'session', 'service:session');
  },
};