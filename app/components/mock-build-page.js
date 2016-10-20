import Ember from 'ember';

export default Ember.Component.extend({
  showHints: false,
  showOverlay: true,
  anyInteractions: false,

  classNames: ['MockBuildPage'],
  classNameBindings: ['classes', 'showHints:MockBuildPage--showHints'],

  // We set style directly because we want both images to be in the initial DOM to avoid flicker.
  showWhenOverlay: Ember.computed('showOverlay', function() {
    return new Ember.String.htmlSafe(!this.get('showOverlay') ? 'display: none' : '');
  }),
  hideWhenOverlay: Ember.computed('showOverlay', function() {
    return new Ember.String.htmlSafe(this.get('showOverlay') ? 'display: none' : '');
  }),

  setupScrollHandler: Ember.on('didInsertElement', function() {
    this.$('img').on('load', function() {
      Ember.$(window).bind('scroll.MockBuildPage', this._showHintsIfVisible.bind(this));
      this._showHintsIfVisible();
    }.bind(this));
  }),
  destroyScrollHandler: Ember.on('willDestroyElement', function() {
    Ember.$(window).unbind('.MockBuildPage');
  }),
  _showHintsIfVisible() {
    if (this.get('isDestroyed')) {
      return;
    }
    var elementHeight = this.$().height();
    var elementTop = this.$().offset().top;
    var elementHeightShowing = Ember.$(window).height() - elementTop + Ember.$(window).scrollTop();
    if (elementHeightShowing > elementHeight * (9/10)) {
      this.set('showHints', true);
      Ember.$(window).unbind('.MockBuildPage');
    }
  },
  actions: {
    toggleOverlay() {
      this.set('anyInteractions', true);
      this.set('showOverlay', !this.get('showOverlay'));
    }
  },
});
