import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,

  text: 'Edit on GitHub',
  href: Ember.computed(function() {
    return 'https://github.com/percy/percy-docs/tree/master' + window.location.pathname + '.md';
  }),
  tagName: 'a',
  classNames: [
    'DocsEditButton',
  ],
  attributeBindings: ['href'],
  classNameBindings: [
    'classes',
  ],
});
