import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return `snapshot-${i}`;
  },
  name(i) {
    return `Test Snapshot ${i}`;
  },
});
