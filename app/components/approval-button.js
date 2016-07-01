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
  click() {
    // TODO(fotinakis): encapsulate headers for custom API ajax requests.
    var self = this;
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('approveBuild', self.get('build.id')),
    }).then(
      function() {
        self.get('build').reloadAll();
      },
      function() {
        self.get('build').reloadAll();
      }
    );
  },
});
