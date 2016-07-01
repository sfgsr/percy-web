import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classes: null,

  click() {
    this.send('navigateToBuild');
  },
  classNames: [
    'BuildCard',
    'container',
  ],
  classNameBindings: [
    'classes',
    'build.isExpired:BuildCard--expired',
  ],
  actions: {
    navigateToBuild() {
      this.sendAction('navigateToBuild', this.get('build'));
    },
  },
});
