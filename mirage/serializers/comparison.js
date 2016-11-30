import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  include: ['pdiff', 'baseScreenshot', 'headScreenshot']
});
