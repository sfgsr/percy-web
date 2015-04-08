import Ember from 'ember';

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
      // TODO(fotinakis): #hardcoding.
      url: 'http://localhost:3000/v1/builds/' + this.get('build.id') + '/approve',
    });
  },
});
