import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('identity', {
  default: {
    user: FactoryGuy.belongsTo('user'),
    uid: faker.random.number(),
  },

  traits: {
    githubProvider: {
      provider: () => {
        return 'github';
      },
    },
    auth0Provider: {
      provider: () => {
        return 'auth0';
      },
    },
  },
});
