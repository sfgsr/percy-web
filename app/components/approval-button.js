import $ from 'jquery';
import {alias} from '@ember/object/computed';
import Component from '@ember/component';
import utils from '../lib/utils';

export default Component.extend({
  build: null,
  approve: null,
  isApproved: alias('build.isApproved'),
  isLoading: false,
  tagName: 'button',
  classNames: ['approval-button btn btn-md btn-success ml-3 px-3 pl-8 flex align-center'],
  classNameBindings: ['classes', 'isLoading:is-loading', 'isApproved:is-approved'],
  click() {
    this.send('buildApproved');
  },
  actions: {
    buildApproved() {
      this.set('isLoading', true);
      $.ajax({
        type: 'POST',
        url: utils.buildApiUrl('approveBuild', this.get('build.id')),
      })
        .then(() => {
          return this.get('build').reloadAll();
        })
        .then(() => {
          this.set('isLoading', false);
        });

      this.get('approve')();
    },
  },
});
