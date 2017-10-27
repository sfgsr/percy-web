import {run} from '@ember/runloop';

export default function destroyApp(application) {
  server.shutdown();
  run(application, 'destroy');
}
