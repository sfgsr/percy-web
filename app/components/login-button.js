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
  click() {
    this.send('login');
  },
  actions: {
    login() {
      this.sendAction('redirectToLogin');
    }
  },
});
