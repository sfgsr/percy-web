import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  classes: null,

  tagName: 'a',
  href: utils.buildApiUrl('login', {params: {extended_permissions: 1}}),
  classNames: [
    'LoginExtendedButton',
    'Button',
    'Button--withLeftIcon',
  ],
  classNameBindings: [
    'classes',
  ],
  click: function() {
    this.send('login');
  },
  actions: {
    login: function() {
      var params = {
        redirect_to: window.location.href,
        extended_permissions: 1,
      };
      window.location = utils.buildApiUrl('login', {params: params});
    },
  },
});
