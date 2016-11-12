import Ember from 'ember';
import BaseFormComponent from './base';

export default BaseFormComponent.extend({
  organizationUser: null,
  classes: null,

  classNames: ['FormsOrganizationUserEdit', 'Form'],
  classNameBindings: ['classes'],

  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.data.authenticated.user'),
  isCurrentUser: Ember.computed('organizationUser', 'currentUser', function() {
    // TODO: why can't we use Ember.computed.equal for this?
    return this.get('organizationUser.user.id') === this.get('currentUser.id');
  }),
  deleteText: Ember.computed('isCurrentUser', function() {
    if (this.get('isCurrentUser')) {
      return 'Leave Organization';
    } else {
      return 'Remove User';
    }
  }),
  model: Ember.computed.alias('organizationUser'),
  validator: null,
});
