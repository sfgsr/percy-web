import Component from '@ember/component';

export default Component.extend({
  user: null,
  classes: null,
  linked: false,

  classNames: ['user-avatar rounded'],
  classNameBindings: ['classes'],
});
