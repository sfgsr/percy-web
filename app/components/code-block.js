import {on} from '@ember/object/evented';
import Component from '@ember/component';

export default Component.extend({
  lang: null,

  classNames: ['CodeBlock'],
  highlight: on('didInsertElement', function() {
    this.$('pre code').each(function(i, block) {
      window.hljs.highlightBlock(block);
    });
  }),
});
