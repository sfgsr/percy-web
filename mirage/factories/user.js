import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  email(i) { return `name${i}@domain.com`; },
  name(i) { return `Name ${i}`; },
  login(i) { return `login-name-${i}`; },
  id() { return this.name.underscore(); }
});
