import {or} from '@ember/object/computed';
import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  build: null,
  classNames: ['BuildHeader'],

  showActions: or('build.isPending', 'build.isProcessing', 'build.isFinished'),

  formattedFailedSnapshots: computed('build.failureDetails', function() {
    return '"' + this.get('build.failureDetails').failed_snapshots.join('", "') + '"';
  }),
});
