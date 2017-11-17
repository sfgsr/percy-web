import {getOwner} from '@ember/application';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  classes: null,

  classNames: ['OrganizationsJumpToBilling'],
  classNameBindings: ['classes'],

  session: service(),
  currentUser: alias('session.currentUser'),

  actions: {
    chooseOrganization(organization) {
      // Send action directly up to application controller, so we don't have to delegate every
      // time in the template.
      let applicationController = getOwner(this).lookup('controller:application');
      applicationController.send('navigateToOrganizationBilling', organization);
    },
    hide() {
      this.get('hide')();
    },
  },
});
