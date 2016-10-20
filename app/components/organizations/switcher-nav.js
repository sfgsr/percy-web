import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,

  isExpanded: false,

  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.data.authenticated.user'),

  classNames: ['OrganizationsSwitcherNav'],
  classNameBindings: [
    'classes',
  ],

  actions: {
    toggleSwitcher() {
      this.get('currentUser.organizations').reload();
      this.toggleProperty('isExpanded');
    },
    hideSwitcher() {
      this.set('isExpanded', false);
    },
  }
});
