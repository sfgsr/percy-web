import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('user', {
  default: {
    login: () => faker.internet.userName(),
    name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: () => faker.internet.email(),
    avatarUrl: () => faker.internet.avatar(),
    githuId: () => faker.random.number(),
    lastSyncedAt: () => faker.date.past(),
    lastPrivateSyncedAt: () => faker.date.past(),
    userHash: () => faker.random.number(),
    createdAt: () => new Date(),
    updatedAt: () => new Date(),

    // add this when we need it
    // orgainzations: FactoryGuy.belongsTo('organization'),
  },
  traits: {},
});
