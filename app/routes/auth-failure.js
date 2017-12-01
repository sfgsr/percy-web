import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  flashMessages: service(),
  beforeModel() {
    this.get('flashMessages').danger(
      'There was a problem with logging in. \
        Please try again or contact us if the issue does not resolve.',
    );

    this.transitionTo('index');
  },
});
