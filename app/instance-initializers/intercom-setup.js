import config from '../config/environment';

export default {
  name: 'intercom-setup',
  initialize() {
    if (window.Intercom) {
      window.Intercom('boot', {app_id: config.APP.INTERCOM_APP_ID});
    }
  },
};