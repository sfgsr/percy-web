import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('repo', {
  default: {
    name: () => faker.lorem.slug(20),
    htmlUrl: () => faker.internet.url(),
    slug: () => faker.lorem.slug(),
    source: 'none',
    hostname: '',
    isPrivate: false,
  },
  traits: {
    github: {
      name: () => faker.lorem.slug(20),
      htmlUrl: () => faker.internet.url(),
      slug: () => faker.lorem.slug(),
      source: 'github',
      hostname: 'github.com',
    },
    githubEnterprise: {
      name: () => faker.lorem.slug(20),
      htmlUrl: () => faker.internet.url(),
      slug: () => faker.lorem.slug(),
      source: 'github_enterprise',
      hostname: () => 'enterprise-host.com',
    },
  },
});
