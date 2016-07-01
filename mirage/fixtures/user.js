export default {
  "data": {
    "id": "12345",
    "type": "users",
    "attributes": {
      "login": "test-user",
      "name": "Test User",
      "email": "fake@example.com",
      "avatar-url": "https://avatars.githubusercontent.com/u/12261879?v=3",
      "github-id": 12261879,
      "last-synced-at": "2015-10-20T22:25:04.000Z",
      "last-private-synced-at": "2015-10-20T22:25:04.000Z",
      "created-at": "2015-10-20T18:17:13.000Z",
      "updated-at": "2016-04-13T22:16:38.000Z"
    },
    "links": {
      "self": "/api/v1/users/12345"
    },
    "relationships": {
      "subscription": {
        "links": {
          "related": "/api/v1/subscription"
        },
        "data": {
          "type": "subscriptions",
          "id": "234"
        }
      }
    }
  },
  "included": [
    {
      "id": "234",
      "type": "subscriptions",
      "attributes": {
        "plan": "v1-premium-xl",
        "plan-name": "Premium XL plan",
        "plan-usage-limit": 200000,
        "plan-history-limit-days": 90,
        "current-usage": 0,
        "billing-email": "fake@example.com"
      }
    }
  ]
};
