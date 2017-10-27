import $ from 'jquery';
import {alias} from '@ember/object/computed';
import Component from '@ember/component';
import utils from '../lib/utils';

export default Component.extend({
  build: null,
  approve: null,

  isApproved: alias('build.isApproved'),
  tagName: 'button',
  classNames: ['ApprovalButton', 'Button', 'Button--withLeftIcon'],
  classNameBindings: ['classes', 'isApproved:ApprovalButton--approved'],
  click() {
    this.send('buildApproved');
  },
  actions: {
    buildApproved() {
      $.ajax({
        type: 'POST',
        url: utils.buildApiUrl('approveBuild', this.get('build.id')),
      }).then(
        () => {
          this.get('build').reloadAll();
        },
        () => {
          this.get('build').reloadAll();
        },
      );

      this.get('approve')();
    },
  },
});
