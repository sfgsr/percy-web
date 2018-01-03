import Component from '@ember/component';

export default Component.extend({
  classes: null,
  text: 'Sign in with GitHub',

  showIcon: true,
  tagName: 'a',
  classNames: ['LoginButton', 'Button', 'Button--primary', 'Button--onDark'],
  classNameBindings: ['classes', 'showIcon:Button--withLeftIcon'],
  attributeBindings: ['tabindex'],
  tabindex: 0,

  click() {
    this.send('login');
  },

  actions: {
    login() {
      this.sendAction('showLoginModal');
    },
  },

  keyDown(event) {
    // 13 = return key
    if (event.keyCode == 13) {
      this.click();
    }
  },
});
