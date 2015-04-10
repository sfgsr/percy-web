import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  classes: null,

  tagName: 'a',
  href: utils.buildApiUrl('login'),
  classNames: [
    'LoginButton',
    'Button',
    'Button--onDark',
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
      this.get('session').authenticate('authenticator:custom', {doRedirect: true});
    }
  },
});
