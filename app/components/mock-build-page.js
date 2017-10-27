import $ from 'jquery';
import {on} from '@ember/object/evented';
import {htmlSafe} from '@ember/string';
import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  showHints: false,
  showOverlay: true,
  anyInteractions: false,

  classNames: ['MockBuildPage'],
  classNameBindings: ['classes', 'showHints:MockBuildPage--showHints'],

  // We set style directly because we want both images to be in the initial DOM to avoid flicker.
  showWhenOverlay: computed('showOverlay', function() {
    return new htmlSafe(!this.get('showOverlay') ? 'display: none' : '');
  }),
  hideWhenOverlay: computed('showOverlay', function() {
    return new htmlSafe(this.get('showOverlay') ? 'display: none' : '');
  }),

  setupScrollHandler: on('didInsertElement', function() {
    this.$('img').on(
      'load',
      function() {
        $(window).bind('scroll.MockBuildPage', this._showHintsIfVisible.bind(this));
        this._showHintsIfVisible();
      }.bind(this),
    );
  }),
  destroyScrollHandler: on('willDestroyElement', function() {
    $(window).unbind('.MockBuildPage');
  }),
  _showHintsIfVisible() {
    if (this.get('isDestroyed')) {
      return;
    }
    var elementHeight = this.$().height();
    var elementTop = this.$().offset().top;
    var elementHeightShowing = $(window).height() - elementTop + $(window).scrollTop();
    if (elementHeightShowing > elementHeight * (9 / 10)) {
      this.set('showHints', true);
      $(window).unbind('.MockBuildPage');
    }
  },
  actions: {
    toggleOverlay() {
      this.set('anyInteractions', true);
      this.set('showOverlay', !this.get('showOverlay'));
    },
  },
});
