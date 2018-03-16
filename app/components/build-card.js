import {getOwner} from '@ember/application';
import Component from '@ember/component';
import {computed} from '@ember/object';
import {alias} from '@ember/object/computed';

export default Component.extend({
  build: null,
  classes: null,
  tagName: '',

  buildCompletionPercent: alias('build.buildCompletionPercent'),

  progressBarWidth: computed('buildCompletionPercent', function() {
    return `${this.get('buildCompletionPercent') * -1}%`;
  }),

  actions: {
    navigateToBuild() {
      // Send action directly up to application controller, so we don't have to delegate every
      // time in the template.
      let applicationController = getOwner(this).lookup('controller:application');
      applicationController.send('navigateToBuild', this.get('build'));
    },

    stopPropagation(e) {
      e.stopPropagation();
    },
  },
});
