import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('repo', {
  default: {
    name: () => faker.lorem.slug(20),
    htmlUrl: () => faker.internet.url(),
    isPrivate: false
  },
});
