import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  invitation: null,

  classNames: ['InvitationHandler'],
  session: service(),
  currentUser: alias('session.data.authenticated.user'),

  actions: {
    invalidateSession() {
      this.sendAction('invalidateSession');
    },
    accept() {
      // Invitations are accepted with a PATCH request against the invite endpoint.
      this.get('invitation')
        .save()
        .then(
          model => {
            this.sendAction('inviteAccepted', model);
          },
          () => {
            alert(
              'Something went wrong! You might already be in this organization. ' +
                'Feel free to reach out to hello@percy.io for help.',
            );
          },
        );
    },
  },
});
