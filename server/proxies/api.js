var httpProxy = require('http-proxy');

var proxyPath = '/api';
var proxyTarget = process.env.PERCY_WEB_API_HOST || 'http://dev.percy.local:9090';

module.exports = function(app) {
  // For options, see: https://github.com/nodejitsu/node-http-proxy
  var proxyOptions = {};
  if (proxyTarget == 'https://percy.io') {
    proxyOptions = {changeOrigin: true};
  }

  var proxy = httpProxy.createProxyServer(proxyOptions);

  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  var transformerMiddleware = function(req, res, next) {
    var matcher = /.*post_message\/iframe.*/;
    if (proxyTarget == 'https://percy.io' && matcher.test(req.url)) {
      // For this particular request, explicitly disable gzip responses so we don't have to deal
      // with uncompressing them before transforming below.
      req.headers['accept-encoding'] = 'gzip;q=0,deflate,sdch';

      var _write = res.write;
      res.write = function (data) {
        // Hijack the response and transform the postMessage targetOrigin to be the local origin.
        data = data.toString().replace(/'https:\/\/percy\.io'/g, "'http://dev.percy.local:4200'");
        _write.call(res, data);
      }
    }
    next();
  };
  app.use(transformerMiddleware);

  app.use(proxyPath, function(req, res, next) {
    // include root path in proxied request
    req.url = proxyPath + req.url;

    // Authenticate with a user token instead of session cookie, if given, to avoid OAuth flow.
    // This is only done for development and only when pointed at the prod API.
    if (process.env.PERCY_WEB_API_HOST && process.env.PERCY_WEB_AUTH_TOKEN) {
      req.headers['Authorization'] = 'Token token=' + process.env.PERCY_WEB_AUTH_TOKEN;
    }

    proxy.web(req, res, {target: proxyTarget});
  });
};
