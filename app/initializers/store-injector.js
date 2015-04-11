export default {
  name: 'store-injector',
  after: 'store',
  initialize: function(_, application) {
    application.inject('authenticator:custom', 'store', 'store:main');
  },
};
