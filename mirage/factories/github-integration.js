import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  githubHtmlUrl(i) { return `https://github.com/integration_${i}`; }
});
