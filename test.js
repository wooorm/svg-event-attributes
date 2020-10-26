'use strict'

var assert = require('assert')
var test = require('tape')
var svgEventAttributes = require('.')

test('svgEventAttributes', function (t) {
  t.ok(Array.isArray(svgEventAttributes), 'should be an array')

  t.doesNotThrow(function () {
    svgEventAttributes.forEach(function (prop) {
      assert.ok(typeof prop, 'string', prop + ' should be string')
      assert.strictEqual(prop, prop.trim(), prop + ' should be trimmed')
      assert.ok(/^on[a-z]+$/.test(prop), prop + ' should be `a-z`')
    })
  }, 'name should be lowercase, trimmed, alphabetical strings')

  t.end()
})
