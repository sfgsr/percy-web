import seedFaker from 'percy-web/tests/helpers/seed-faker';
import {manualSetup} from 'ember-data-factory-guy';

export default function setupFactoryGuy(container) {
  seedFaker();
  manualSetup(container);
}
