import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,
  text: 'Sign in with GitHub',

  showIcon: true,
  tagName: 'a',
  classNames: ['LoginButton', 'Button', 'Button--primary', 'Button--onDark'],
  attributeBindings: ['href'],
  classNameBindings: ['classes', 'showIcon:Button--withLeftIcon'],
  click() {
    this.send('login');
  },
  actions: {
    login() {
      this.sendAction('redirectToLogin');
    },
  },
});
