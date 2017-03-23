import Ember from 'ember';

export default function destroyApp(application) {
  if (window.server) {
    window.server.shutdown();
  }
  Ember.run(application, 'destroy');
}
