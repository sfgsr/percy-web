import {Factory} from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  token: 'abc',
  role: 'write_only',
  is_active: true,
  createdAt() {
    return moment();
  },
});
