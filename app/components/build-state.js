import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classes: null,

  classNames: ['BuildState'],
  classNameBindings: [
    'classes',

    'build.isPending:BuildState--pending',
    'build.isProcessing:BuildState--processing',
    'build.isFinished:BuildState--finished',
    'build.isFailed:BuildState--failed',
    'build.isExpired:BuildState--expired',

    'build.isApproved:BuildState--approved',
    'build.hasDiffs:BuildState--hasDiffs',
  ],
});
