import Ember from 'ember';

export default Ember.Component.extend({
  showHints: false,
  showOverlay: true,

  classNames: ['MockBuildPage'],
  classNameBindings: ['classes', 'showHints:MockBuildPage--showHints'],

  // We set style directly because we want both images to be in the initial DOM to avoid flicker.
  showWhenOverlay: function() {
    return (!this.get('showOverlay') ? 'display: none' : '').htmlSafe();
  }.property('showOverlay'),
  hideWhenOverlay: function() {
    return (this.get('showOverlay') ? 'display: none' : '').htmlSafe();
  }.property('showOverlay'),

  fadeHintsOnScroll: function() {
    var self = this;
    var windowHeight = Ember.$(window).height(); // Assume no resize, for performance sake.
    var element = this.$();
    var elementTop = element.offset().top;

    Ember.$(window).bind('scroll', function(){
      var elementHeightShowing = windowHeight - elementTop + Ember.$(window).scrollTop();
      if (elementHeightShowing > 650) {
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
