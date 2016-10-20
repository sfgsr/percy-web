import Ember from 'ember';

export default Ember.Component.extend({
  // TODO: remove this flag. #projectification launch.
  useNewProjectsHeader: false,

  session: Ember.inject.service(),
});
