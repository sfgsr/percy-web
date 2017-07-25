import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  build: null,
  approve: null,

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
    this.send('buildApproved');
  },
  actions: {
    buildApproved() {
      Ember.$.ajax({
        type: 'POST',
        url: utils.buildApiUrl('approveBuild', this.get('build.id')),
      }).then(
        () => {
          this.get('build').reloadAll();
        },
        () => {
          this.get('build').reloadAll();
        }
      );

      this.get('approve')();
    }
  }
});
