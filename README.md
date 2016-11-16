# percy-web

[![Build status](https://badge.buildkite.com/c5a2ecb69c413ef1b2709d9c256edb4a17c1922b23f38bbefe.svg)](https://buildkite.com/percy/test-web)

Ember web app for [Percy](https://percy.io).

## Setup

First, install [yarn](https://yarnpkg.com).

```
yarn
bower install
```

## Run

```
npm run start
```

To hit the production API, two environment variables must be set:

```
export PERCY_WEB_AUTH_TOKEN=...
export PERCY_WEB_API_HOST=https://percy.io

npm run start
```
