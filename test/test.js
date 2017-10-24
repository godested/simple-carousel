require.config({
  paths: {
    'src': '../src'
  }
});

var specsList = [
  'views/carousel',
  'models/carousel',
  'utils'
];

require(specsList, jasmineRun);