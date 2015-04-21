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
    // TODO(fotinakis): encapsulate headers for custom API ajax requests.
    var self = this;
    var token = this.get('session.secure.token');
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('approveBuild', self.get('build.id')),
      headers: {'Authorization': 'Token token=' + token},
    }).then(function() {
      self.get('build').reloadAll();
    });
  },
});
