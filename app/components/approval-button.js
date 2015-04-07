import Ember from 'ember';

export default Ember.Component.extend({
  build: null,

  isApproved: false,
  text: 'Approve Diffs',
  tagName: 'button',
  classNames: [
    'ApprovalButton',
    'Button',
    'Button--withLeftIcon',
  ],
  classNameBindings: [
    'classes',
    'isApproved:ApprovalButton--approved',
  ],
});
