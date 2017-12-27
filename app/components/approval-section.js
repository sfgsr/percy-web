import {alias} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  build: null,

  approvedNow: false,
  isApproved: alias('build.isApproved'),
  classNameBindings: [
    'classes',
    'isApproved:ApprovalSection--approved',
    'approvedNow:ApprovalSection--approvedNow',
  ],

  actions: {
    approve() {
      this.set('approvedNow', true);
    },
  },
});
