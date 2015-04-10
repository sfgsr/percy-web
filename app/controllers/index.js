import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Controller.extend({
  loginUrl: function() {
    return utils.buildApiUrl('login', {params: {redirect_to: window.location.href + 'repos/'}});
  }.property(),
});