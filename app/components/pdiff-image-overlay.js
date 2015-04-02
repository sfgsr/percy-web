import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['PdiffImageOverlay'],
  classNameBindings: [
    'showBase::PdiffImageOverlay--hideBaseScreenshot',
    'showHead::PdiffImageOverlay--hideHeadScreenshot',
    'showDiff::PdiffImageOverlay--hideDiff',
  ],

  showBase: true,
  showHead: false,
  showDiff: true,

  actions: {
    toggleBase: function() {
      this.set('showBase', !this.get('showBase'));
    },
    toggleHead: function() {
      this.set('showHead', !this.get('showHead'));
    },
    toggleDiff: function() {
      this.set('showDiff', !this.get('showDiff'));
    },
  },
});