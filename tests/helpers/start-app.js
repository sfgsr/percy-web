import {run} from '@ember/runloop';
import {merge} from '@ember/polyfills';
import Application from '../../app';
import config from '../../config/environment';

// This import registers Percy's async test helpers for all acceptance tests.
import './percy/register-helpers';

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}
