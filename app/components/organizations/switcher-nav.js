import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  classes: null,

  isExpanded: false,

  session: service(),
  currentUser: alias('session.currentUser'),

  classNames: ['OrganizationsSwitcherNav'],
  classNameBindings: ['classes'],

  actions: {
    toggleSwitcher() {
      this.get('currentUser.organizations').reload();
      this.toggleProperty('isExpanded');
    },
    hideSwitcher() {
      this.set('isExpanded', false);
    },
  },
});
