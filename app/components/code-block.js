import Ember from 'ember';

export default Ember.Component.extend({
  lang: null,

  highlight: function() {
    this.$('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }.on('didInsertElement'),
});
