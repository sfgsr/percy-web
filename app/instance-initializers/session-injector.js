export default {
  name: 'session-injector',
  initialize(appInstance) {
    appInstance.inject('controller', 'session', 'service:session');
  },
};