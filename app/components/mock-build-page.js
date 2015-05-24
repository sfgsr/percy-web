import Ember from 'ember';

export default Ember.Component.extend({
  showHints: false,
  showOverlay: true,
  anyInteractions: false,

  classNames: ['MockBuildPage'],
  classNameBindings: ['classes', 'showHints:MockBuildPage--showHints'],

  // We set style directly because we want both images to be in the initial DOM to avoid flicker.
  showWhenOverlay: function() {
    return (!this.get('showOverlay') ? 'display: none' : '').htmlSafe();
  }.property('showOverlay'),
  hideWhenOverlay: function() {
    return (this.get('showOverlay') ? 'display: none' : '').htmlSafe();
  }.property('showOverlay'),

  setupScrollHandler: function() {
    Ember.$(window).ready(function() {
      Ember.$(window).bind('scroll.MockBuildPage', this._showHintsIfVisible.bind(this));
      this._showHintsIfVisible();
    }.bind(this));
  }.on('didInsertElement'),
  _showHintsIfVisible: function() {
    var elementHeight = this.$().height();
    var elementTop = this.$().offset().top;
    var elementHeightShowing = Ember.$(window).height() - elementTop + Ember.$(window).scrollTop();
    if (elementHeightShowing > elementHeight * (9/10)) {
      this.set('showHints', true);
      Ember.$(window).unbind('.MockBuildPage');
    }
  },
  actions: {
    toggleOverlay: function() {
      this.set('anyInteractions', true);
      this.set('showOverlay', !this.get('showOverlay'));
    }
  },
});
