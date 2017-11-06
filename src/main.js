require.config({
  paths: {
    text: '../lib/text',
    src: './'
  }
});

require(['app'], function (app) {
  app.start();
});