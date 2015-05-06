import Ember from 'ember';
import config from '../config/environment';

export default {
  buildApiUrl: function() {
    var key = arguments[0];
    var otherArgs = Array.prototype.slice.call(arguments, 1);

    // Options, if given, must be the last arg and must be a hash.
    var options = otherArgs.slice(-1)[0];
    if (typeof(options) === 'object') {
      otherArgs = otherArgs.slice(0, -1);
    } else {
      options = {};
    }
    var params = options.params;
    var queryParams = params ? '?' + Ember.$.param(params) : '';

    var path = config.APP.apiUrls[key];
    if (!path) {
      Ember.Logger.error('API path not found for key: ' + key);
      return;
    }

    // If the path requires formatting, make sure the right number of args have been given.
    var numFormatsRequired = (path.match(/%@/g) || []).length;
    if (numFormatsRequired !== otherArgs.length) {
      Ember.Logger.error(
        'Mismatched number of formatting args for: ' + path + '\nGot: ' + otherArgs);
      return;
    } else {
      path = path.fmt.apply(path, otherArgs);
    }
    return window.location.origin + path + queryParams;
  },
};