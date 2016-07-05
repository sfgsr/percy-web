import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define(
  'user',
  {
    sequences: {
      name: (num) => { return `User ${num}`; },
      login: (num) => { return `user-${num}`; },
      email: (num) => { return `user-${num}@example.com`; },
    },
    default: {
      style: 'normal',
      login: FactoryGuy.generate('login'),
      name: FactoryGuy.generate('name'),
      email: FactoryGuy.generate('email'),
      avatarUrl: 'https://avatars.githubusercontent.com/u/12261879?v=3',
      githubId: 12261879,
      // TODO(fotinakis): add missing date attributes.
      // "last-synced-at": "2015-10-20T22:25:04.000Z",
      // "last-private-synced-at": "2015-10-20T22:25:04.000Z",
      // "created-at": "2015-10-20T18:17:13.000Z",
      // "updated-at": "2016-04-13T22:16:38.000Z"
    },
    traits: {
    }
  }
);
