import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('project', {
  default: {
    name: faker.commerce.productName(),
  },
  traits: {},
});
