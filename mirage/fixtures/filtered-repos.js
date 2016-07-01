export default {
  "data": [
    {
      "id": "test-user/test-repo",
      "type": "repos",
      "attributes": {
        "github-id": 111222333,
        "name": "test-repo",
        "slug": "test-user/test-repo",
        "is-private": false,
        "is-enabled": true,
        "diff-base": "automatic",
        "html-url": "https://github.com/test-user/test-repo",
        "description": "test description",
        "created-at": "2015-10-20T22:25:06.000Z",
        "updated-at": "2016-04-22T15:54:51.000Z"
      },
      "links": {
        "self": "/api/v1/repos/test-user/test-repo"
      },
      "relationships": {
        "namespace": {
          "links": {
            "self": "/api/v1/repos/test-user/test-repo/relationships/namespace",
            "related": "/api/v1/repos/test-user/test-repo/namespace"
          },
          "data": {
            "type": "namespaces",
            "id": "test-user"
          }
        },
        "owner": {
          "links": {
            "self": "/api/v1/repos/test-user/test-repo/relationships/owner",
            "related": "/api/v1/repos/test-user/test-repo/owner"
          },
          "data": {
            "type": "users",
            "id": "test-user"
          }
        },
        "users": {
          "links": {
            "self": "/api/v1/repos/test-user/test-repo/relationships/users",
            "related": "/api/v1/repos/test-user/test-repo/users"
          }
        },
        "builds": {
          "links": {
            "self": "/api/v1/repos/test-user/test-repo/relationships/builds",
            "related": "/api/v1/repos/test-user/test-repo/builds"
          }
        },
        "tokens": {
          "links": {
            "self": "/api/v1/repos/test-user/test-repo/relationships/tokens",
            "related": "/api/v1/repos/test-user/test-repo/tokens"
          }
        }
      }
    }
  ],
  "included": [
    {
      "id": "test-user",
      "type": "namespaces",
      "attributes": {}
    },
    {
      "id": "test-user",
      "type": "users",
      "attributes": {
        "login": "test-user",
        "name": "Test User",
        "avatar-url": "https://avatars.githubusercontent.com/u/12261879?v=3",
        "github-id": 12261879
      },
      "links": {
        "self": "/api/v1/users/test-user"
      },
      "relationships": {
        "subscription": {
          "links": {
            "related": "/api/v1/subscription"
          }
        }
      }
    }
  ]
};