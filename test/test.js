require.config({
  paths: {
    src: '../src',
    test: './',
    text: '../lib/text'
  }
});

var specsList = [
  'views/carousel',
  'models/carousel',
  'utils'
];

require(specsList, jasmineRun);