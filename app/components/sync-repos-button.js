import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  classes: null,
  redirectTo: null,

  tagName: 'a',
  href: utils.buildApiUrl('login', {params: {extended_permissions: 1}}),
  classNames: [
    'LoginExtendedButton',
    'Button',
    'Button--withLeftIcon',
    'hint--top',
    'hint--rounded',
    'hint--centered',
  ],
  classNameBindings: [
    'classes',
  ],
  click() {
    this.send('login');
  },
  actions: {
    login() {
      var options = {extendedPermissions: 1};
      if (this.get('redirectTo')) {
        options['redirectTo'] = this.get('redirectTo');
      }
      utils.redirectToLogin(options);
    },
  },
});
