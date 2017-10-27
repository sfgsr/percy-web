import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  docPath: null,
  classes: null,

  text: 'Edit on GitHub',
  href: computed('docPath', function() {
    return 'https://github.com/percy/percy-docs/tree/master' + this.get('docPath') + '.md';
  }),
  tagName: 'a',
  classNames: ['DocsEditButton'],
  attributeBindings: ['href'],
  classNameBindings: ['classes'],
});
