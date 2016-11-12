import Ember from 'ember';

export default Ember.Component.extend({
  organizationUser: null,
  classes: null,

  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.data.authenticated.user'),

  isExpanded: false,
  classNames: ['OrganizationsUserCard'],
  classNameBindings: [
    'classes',
    'isExpanded:OrganizationsUserCard--expanded',
  ],
  actions: {
    toggleExpanded() {
      this.toggleProperty('isExpanded');
    },
  }
});
