import {getOwner} from '@ember/application';
import Component from '@ember/component';

export default Component.extend({
  organization: null,
  classes: null,

  classNames: ['OrganizationsSettingsNavWrapper'],
  classNameBindings: ['classes'],

  actions: {
    chooseProject(project) {
      // Send action directly up to application controller, so we don't have to delegate every
      // time in the template.
      let applicationController = getOwner(this).lookup('controller:application');
      applicationController.send('navigateToProjectSettings', project);
    },
  },
});
