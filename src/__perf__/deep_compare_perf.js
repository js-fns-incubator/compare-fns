var Benchmark = require('benchmark');
var deepCompare = require('../deep_compare');
var isEqual = require('lodash-node/modern/objects/isEqual');

var subjA = { a: [1, 2, 3, 4], b: 'string', c: { d: { e: 'E' } } };
var subjB = { a: [1, 2, 3], b: undefined, c: { d: { e: 'E' } } };

var suite = new Benchmark.Suite;

suite
  .add('deepCompare', function() {
    deepCompare(subjA, subjB);
  })
  .add("Lo-Dash's isEqual", function() {
    isEqual(subjA, subjB);
  })
  .on('cycle', function(event) {
    console.log(event.target);
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run({
    async: true
  });

