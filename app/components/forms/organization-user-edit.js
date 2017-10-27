import {computed} from '@ember/object';
import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import BaseFormComponent from './base';

export default BaseFormComponent.extend({
  organizationUser: null,
  classes: null,

  classNames: ['FormsOrganizationUserEdit', 'Form'],
  classNameBindings: ['classes'],

  session: service(),
  currentUser: alias('session.data.authenticated.user'),
  isCurrentUser: computed('organizationUser', 'currentUser', function() {
    // TODO: why can't we use Ember.computed.equal for this?
    return this.get('organizationUser.user.id') === this.get('currentUser.id');
  }),
  deleteText: computed('isCurrentUser', function() {
    if (this.get('isCurrentUser')) {
      return 'Leave Organization';
    } else {
      return 'Remove User';
    }
  }),
  model: alias('organizationUser'),
  validator: null,
});
