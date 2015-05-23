import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  isApproved: false,

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
  ],
  click: function() {
    this.set('isApproved', !this.get('isApproved'));
    this.sendAction('fakeApprovalToggled', this.get('isApproved'));
  },
});
