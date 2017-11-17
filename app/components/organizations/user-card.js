import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  organizationUser: null,
  classes: null,

  session: service(),
  currentUser: alias('session.currentUser'),

  isExpanded: false,
  classNames: ['OrganizationsUserCard'],
  classNameBindings: ['classes', 'isExpanded:OrganizationsUserCard--expanded'],
  actions: {
    toggleExpanded() {
      this.toggleProperty('isExpanded');
    },
  },
});
