import Ember from 'ember';

export default Ember.Component.extend({
  markdown: null,
  classes: null,

  isMobileExpanded: false,
  classNames: [
    'DocsNav',
  ],
  classNameBindings: [
    'isMobileExpanded:DocsNav--expanded',
    'classes',
  ],
  toggle() {
    this.send('toggle');
  },
  actions: {
    docsNavigate(docsPath) {
      this.sendAction('docsNavigate', docsPath);
    },
    toggle() {
      this.toggleProperty('isMobileExpanded');
    },
  }
});
