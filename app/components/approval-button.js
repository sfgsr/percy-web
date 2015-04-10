import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  build: null,

  isApproved: Ember.computed.alias('build.isApproved'),
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
  click: function() {
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('approveBuild', this.get('build.id')),
    });
  },
});
