import config from 'percy-web/config/environment';

export function initialize(/* application */) {
  Raven.config(config.APP.SENTRY_URL)
    .addPlugin(Raven.Plugins.Ember)
    .install();
}

export default {
  name: 'sentry',
  initialize,
};
