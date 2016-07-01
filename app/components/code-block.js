import Ember from 'ember';

export default Ember.Component.extend({
  lang: null,

  classNames: ['CodeBlock'],
  highlight: Ember.on('didInsertElement', function() {
    this.$('pre code').each(function(i, block) {
      window.hljs.highlightBlock(block);
    });
  }),
});
