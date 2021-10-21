const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/data',
    createProxyMiddleware({
      target: 'https://samples.openweathermap.org',
      changeOrigin: true,
    }),
  );
};
