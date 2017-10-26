require.config({
  paths: {
    'src': '../src',
    text: '../lib/text'
  }
});

var specsList = [
  'views/carousel',
  'models/carousel',
  'utils'
];

require(specsList, jasmineRun);