import {later} from '@ember/runloop';
import $ from 'jquery';
import {on} from '@ember/object/evented';
import {htmlSafe} from '@ember/string';
import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  showHints: false,
  isApproved: false,
  isButtonHovered: false,
  isButtonActive: false,

  classNames: ['MockApprovalFlow'],
  classNameBindings: ['classes'],

  showWhenApproved: computed('isApproved', function() {
    return htmlSafe(!this.get('isApproved') ? 'display: none' : '');
  }),
  hideWhenApproved: computed('isApproved', function() {
    return htmlSafe(this.get('isApproved') ? 'display: none' : '');
  }),
  setupScrollHandler: on('didInsertElement', function() {
    this.$('img').on(
      'load',
      function() {
        $(window).bind('scroll.MockApprovalFlow', this._animateApprovalIfVisible.bind(this));
        this._animateApprovalIfVisible();
      }.bind(this),
    );
  }),
  destroyScrollHandler: on('willDestroyElement', function() {
    $(window).unbind('.MockApprovalFlow');
  }),
  _animateApprovalIfVisible() {
    if (this.get('isDestroyed')) {
      return;
    }
    var elementHeight = this.$().height();
    var elementTop = this.$().offset().top;
    var elementHeightShowing = $(window).height() - elementTop + $(window).scrollTop();
    if (elementHeightShowing > elementHeight * (2 / 3)) {
      later(
        function() {
          if (this.isDestroyed) {
            // If the user has navigated away before this timer fired, skip.
            return;
          }
          this.set('isButtonHovered', true);
          later(
            function() {
              this.set('isButtonHovered', false);
              if (!this.get('isApproved')) {
                this.set('isApproved', true);
              }
            }.bind(this),
            500,
          );
        }.bind(this),
        1000,
      );
      $(window).unbind('.MockApprovalFlow');
    }
  },
});
