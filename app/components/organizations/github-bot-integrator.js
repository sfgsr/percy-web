import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  changeset: null,
  classes: null,
  selectionChanged: null,

  session: service(),
  classNames: ['OrganizationsGithubBotIntegrator'],
  classNameBindings: ['classes'],
  actions: {
    assignMe() {
      // We just delegate handling everything up to the github-settings component for ease.
      this.get('assignMe')();
    },
  },
});
