import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),

  classNames: ['ReposLink'],
  classNameBindings: ['classes'],
  actions: {
    redirectToDefaultOrganization() {
      this.sendAction('redirectToDefaultOrganization');
    },
  },
});
