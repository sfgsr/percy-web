export default {
  name: 'store-injector',
  before: 'simple-auth',
  after: 'store',
  initialize: function(_, application) {
    application.inject('authenticator:custom', 'store', 'store:main');
  },
};
