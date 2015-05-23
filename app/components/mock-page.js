import Ember from 'ember';

export default Ember.Component.extend({
  showHints: false,
  showOverlay: true,
  hideOverlay: Ember.computed.not('showOverlay'),

  classNames: ['MockPage'],
  classNameBindings: ['classes', 'showHints:MockPage--showHints'],

  showWhenOverlay: function() {
    return (this.get('hideOverlay') ? 'display: none' : '').htmlSafe();
  }.property('showOverlay'),
  hideWhenOverlay: function() {
    return (this.get('showOverlay') ? 'display: none' : '').htmlSafe();
  }.property('hideOverlay'),

  fadeHintsOnScroll: function() {
    var self = this;
    var windowHeight = Ember.$(window).height(); // Assume no resize, for performance sake.
    var element = this.$();
    var elementTop = element.offset().top;

    Ember.$(window).bind('scroll', function(){
      var elementHeightShowing = windowHeight - elementTop + Ember.$(window).scrollTop();
      if (elementHeightShowing > 550) {
        self.set('showHints', true);
        Ember.$(window).unbind('scroll');
      }
    });
  }.on('didInsertElement'),

  actions: {
    toggleOverlay: function() {
      this.set('showOverlay', !this.get('showOverlay'));
    }
  },
});
