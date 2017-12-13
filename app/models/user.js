import DS from 'ember-data';
import {computed} from '@ember/object';

export default DS.Model.extend({
  userHash: DS.attr(),
  name: DS.attr(),
  email: DS.attr(),
  avatarUrl: DS.attr(),
  unverifiedEmail: DS.attr('string'),

  // These endpoints are only available on the current user and should not be accessed otherwise.
  organizations: DS.hasMany('organizations', {inverse: null}),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  isVerified: computed.notEmpty('email'),
});
