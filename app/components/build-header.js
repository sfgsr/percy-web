import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classNames: ['BuildHeader'],

  showActions: Ember.computed.or('build.isPending', 'build.isProcessing', 'build.isFinished'),
});
