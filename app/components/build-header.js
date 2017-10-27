import {or} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  build: null,
  classNames: ['BuildHeader'],

  showActions: or('build.isPending', 'build.isProcessing', 'build.isFinished'),
});
