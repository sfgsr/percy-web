import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  classes: null,

  tagName: 'a',
  href: utils.buildApiUrl('login', {params: {extended_permissions: 1}}),
  dataHint: function() {
    return [
    'Due to how GitHub permissions work, we',
    'temporarily request more permissions to',
    'read your personal private repositories.',
    'The token is used once and never stored.',
    ].join('\n');
  }.property(),
  attributeBindings: [
    'dataHint:data-hint',
  ],
  classNames: [
    'LoginExtendedButton',
    'Button',
    'Button--withLeftIcon',
    'hint--top',
    'hint--rounded',
  ],
  classNameBindings: [
    'classes',
  ],
  click: function() {
    this.send('login');
  },
  actions: {
    login: function() {
      var params = {
        redirect_to: window.location.href,
        extended_permissions: 1,
      };
      window.location = utils.buildApiUrl('login', {params: params});
    },
  },
});
