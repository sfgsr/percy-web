import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  organization: null,
  classes: null,

  isPrivateReposExpanded: false,
  session: service(),

  classNames: ['SyncReposSection', 'Card'],
  classNameBindings: ['classes', 'isPrivateReposExpanded::SyncReposSection--collapsed'],
  actions: {
    togglePrivateRepos() {
      this.toggleProperty('isPrivateReposExpanded');
    },
  },
});
