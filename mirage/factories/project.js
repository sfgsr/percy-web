import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  isEnabled: true,
  name(i) { return `Project ${i}`; },
  slug() { return this.name.underscore(); },
  fullSlug() { return `${this.organization.slug}/${this.slug}`; }
});
