import Mixin from '@ember/object/mixin';
import lockOptions from 'percy-web/lib/lock-settings';
import $ from 'jquery';

// This mixin should be used when accessing the lock.js authentication modal.
// This mixin fires a request to our backend's `/api/auth/session` endoint and
// gets back an object with a state token (`{state: 'foo'}`).
// We wait for this token to get back, set it in the lock options, and
// only then have the lock modal show up.
// This should protect against CSRF attacks.
var EnsureStatefulLogin = Mixin.create({
  // Use this instead of calling `this.get('session').authenticate...` from your routes
  showLoginModalEnsuringState() {
    return this._getStateToken().then(stateToken => {
      lockOptions.auth.params.state = stateToken.state;
      return this.get('session').authenticate('authenticator:auth0-lock', lockOptions);
    });
  },

  _getStateToken() {
    return $.ajax({
      type: 'GET',
      url: '/api/auth/session',
    });
  },
});

export default EnsureStatefulLogin;
