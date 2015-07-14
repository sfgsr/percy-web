import Ember from 'ember';

export default Ember.Component.extend({
  lang: null,

  classNames: ['CodeBlock'],
  highlight: function() {
    this.$('pre code').each(function(i, block) {
      window.hljs.highlightBlock(block);
    });
  }.on('didInsertElement'),
});
