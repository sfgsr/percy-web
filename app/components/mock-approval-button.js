import Ember from 'ember';

export default Ember.Component.extend({
  isApproved: false,
  isButtonHovered: false,
  isButtonActive: false,

  tagName: 'button',
  classNames: [
    'MockApprovalButton',
    'ApprovalButton',
    'Button',
    'Button--withLeftIcon',
  ],
  classNameBindings: [
    'classes',
    'isApproved:ApprovalButton--approved',
    // Custom hover/active classes for animation.
    'isButtonHovered:ApprovalButton--hover',
    'isButtonActive:ApprovalButton--active',
  ],
  click() {
    this.set('isApproved', !this.get('isApproved'));
  },
});
