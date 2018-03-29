import {or} from '@ember/object/computed';
import Component from '@ember/component';
import {computed} from '@ember/object';
import {alias} from '@ember/object/computed';

export default Component.extend({
  build: null,
  classNames: ['BuildHeader'],

  buildCompletionPercent: alias('build.buildCompletionPercent'),

  progressBarWidth: computed('buildCompletionPercent', function() {
    return `${this.get('buildCompletionPercent') - 100}%`;
  }),

  showActions: or('build.isPending', 'build.isProcessing', 'build.isFinished'),

  formattedFailedSnapshots: computed('build.failureDetails', function() {
    return '"' + this.get('build.failureDetails').failed_snapshots.join('", "') + '"';
  }),
});
