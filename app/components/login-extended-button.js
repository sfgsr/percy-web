import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Component.extend({
  classes: null,

  tagName: 'a',
  href: utils.buildApiUrl('login', {params: {extended_permissions: 1}}),
  dataHint: function() {
    return [
      'Due to how GitHub authorization works,',
      'we request higher permissions to access',
      'your private repositories. We only use',
      'the token to read repository metadata',
      'and to set commit statuses.',
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
    'hint--centered',
  ],
  classNameBindings: [
    'classes',
  ],
  click: function() {
    this.send('login');
  },
  actions: {
    login: function() {
      utils.redirectToLogin({extendedPermissions: 1});
    },
  },
});
