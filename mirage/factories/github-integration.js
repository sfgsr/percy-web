import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  githubInstallationId() {
    return 888;
  },
  githubHtmlUrl(i) {
    return `https://github.com/integration_${i}`;
  },
});
