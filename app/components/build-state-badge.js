import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classes: null,

  classNames: ['BuildStateBadge'],
  classNameBindings: [
    'classes',

    'build.isPending:BuildStateBadge--pending',
    'build.isProcessing:BuildStateBadge--processing',
    'build.isFinished:BuildStateBadge--finished',
    'build.isFailed:BuildStateBadge--failed',
    'build.isExpired:BuildStateBadge--expired',
    'build.isApproved:BuildStateBadge--approved',
    'build.hasDiffs:BuildStateBadge--hasDiffs',
  ],
});
