import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  githubId(i) {
    return i;
  },

  name(i) {
    return `Repo-${i}`;
  },

  slug(i) {
    return `Repo-${i}-slug`;
  },
});
