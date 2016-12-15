import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

// This import registers Percy's async test helpers for all acceptance tests.
import './percy/register-helpers';

export default function startApp(attrs) {
  let application;

  // use defaults, but you can override
  let attributes = Ember.assign({}, config.APP, attrs);

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
