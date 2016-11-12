import Ember from 'ember';

export default Ember.Component.extend({
  organization: null,
  classes: null,

  isPrivateReposExpanded: false,
  session: Ember.inject.service(),

  classNames: ['SyncReposSection', 'Alert', 'Alert--info'],
  classNameBindings: ['classes', 'isPrivateReposExpanded::SyncReposSection--collapsed'],
  actions: {
    togglePrivateRepos() {
      this.toggleProperty('isPrivateReposExpanded');
    },
  },
});
