import Ember from 'ember';
import DS from 'ember-data';

const ROLE_ID_TO_TITLE = {
  admin: 'Administrator',
  member: 'Member',
  billing_admin: 'Billing Admin',
};

export default DS.Model.extend({
  organization: DS.belongsTo('user', {async: false}),
  user: DS.belongsTo('user', {async: false, inverse: null}),
  role: DS.attr(),

  roleTitle: Ember.computed('role', function() {
    return ROLE_ID_TO_TITLE[this.get('role')];
  }),
});
