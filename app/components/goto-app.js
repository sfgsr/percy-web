import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: ['ReposLink'],
  classNameBindings: ['classes'],
  actions: {
    redirectToDefaultOrganization() {
      this.sendAction('redirectToDefaultOrganization');
    },
  },
});
