import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,
  text: 'Sign in with GitHub',

  tagName: 'a',
  classNames: [
    'LoginButton',
    'Button',
    'Button--primary',
    'Button--onDark',
    'Button--withLeftIcon',
  ],
  attributeBindings: ['href'],
  classNameBindings: [
    'classes',
  ],
  click: function() {
    this.send('login');
  },
  actions: {
    login: function() {
      this.sendAction('redirectToLogin');
    }
  },
});
