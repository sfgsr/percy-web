import {Factory} from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  email(i) {
    return `user-${i}@domain.com`;
  },
  name(i) {
    return `Fake User ${i}`;
  },
  login(i) {
    return `user-${i}`;
  },
  avatarUrl() {
    return 'https://avatars2.githubusercontent.com/u/12261879?v=3&s=400';
  },
  createdAt() {
    return moment();
  },
});
