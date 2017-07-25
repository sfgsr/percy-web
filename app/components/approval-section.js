import Ember from 'ember';

export default Ember.Component.extend({
  build: null,

  approvedNow: false,
  classNames: ['ApprovalSection'],
  isApproved: Ember.computed.alias('build.isApproved'),
  classNameBindings: [
    'classes',
    'isApproved:ApprovalSection--approved',
    'approvedNow:ApprovalSection--approvedNow',
  ],

  actions: {
    approve() {
      this.set('approvedNow', true);
    }
  }
});
