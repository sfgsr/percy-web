import Ember from 'ember';

export default Ember.Component.extend({
  organization: null,
  classes: null,

  classNames: ['OrganizationsUsersList'],
  classNameBindings: [
    'classes',
  ],
  actions: {
  }
});
