import Component from '@ember/component';

export default Component.extend({
  classes: null,
  text: 'Sign In',

  showIcon: true,
  tagName: 'a',
  classNames: ['LoginButton', 'Button', 'Button--primary', 'Button--onDark'],
  attributeBindings: ['href'],
  click() {
    this.send('login');
  },
  actions: {
    login() {
      this.sendAction('showLoginModal');
    },
  },
});
