import config from 'percy-web/config/environment';

export default function() {
  if (config.environment === 'test') {
    return Math.seedrandom('randomseed');
  } else {
    return Math.random();
  }
}
