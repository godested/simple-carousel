// noinspection JSFileReferences
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
  'util/Observable',
  'utils'
];

require(specsList, jasmineRun);