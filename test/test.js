// noinspection JSFileReferences
require.config({
  paths: {
    src: '../src',
    test: './',
    text: '../lib/text'
  }
});

var specsList = [
  'views/Carousel',
  'models/Carousel',
  'util/Observable',
  'utils'
];

require(specsList, jasmineRun);