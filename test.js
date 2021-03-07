import assert from 'assert'
import test from 'tape'
import {svgEventAttributes} from './index.js'

test('svgEventAttributes', function (t) {
  t.ok(Array.isArray(svgEventAttributes), 'should be an array')

  t.doesNotThrow(function () {
    var index = -1
    var prop

    while (++index < svgEventAttributes.length) {
      prop = svgEventAttributes[index]
      assert.ok(typeof prop, 'string', prop + ' should be string')
      assert.strictEqual(prop, prop.trim(), prop + ' should be trimmed')
      assert.ok(/^on[a-z]+$/.test(prop), prop + ' should be `a-z`')
    }
  }, 'name should be lowercase, trimmed, alphabetical strings')

  t.end()
})
