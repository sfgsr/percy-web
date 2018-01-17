import $ from 'jquery';
import Component from '@ember/component';
import utils from '../lib/utils';

export default Component.extend({
  user: null,
  requestSent: false,

  actions: {
    createPasswordChangeRequest() {
      this.set('isLoading', true);

      $.ajax({
        type: 'POST',
        url: utils.buildApiUrl('passwordChangeRequest', this.get('user.emailPasswordIdentity.id')),
      })
        .then(() => {
          this.set('requestSent', true);
        })
        .always(() => {
          this.set('isLoading', false);
        });
    },
  },
});
