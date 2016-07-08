import Ember from 'ember';

export default Ember.Component.extend({
  docPath: null,
  classes: null,

  text: 'Edit on GitHub',
  href: Ember.computed('docPath', function() {
    return 'https://github.com/percy/percy-docs/tree/master' + this.get('docPath') + '.md';
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
