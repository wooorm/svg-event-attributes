import assert from 'node:assert'
import test from 'tape'
import {svgEventAttributes} from './index.js'

test('svgEventAttributes', function (t) {
  t.ok(Array.isArray(svgEventAttributes), 'should be an array')

  t.doesNotThrow(function () {
    let index = -1

    while (++index < svgEventAttributes.length) {
      const prop = svgEventAttributes[index]
      assert.equal(typeof prop, 'string', prop + ' should be string')
      assert.strictEqual(prop, prop.trim(), prop + ' should be trimmed')
      assert.ok(/^on[a-z]+$/.test(prop), prop + ' should be `a-z`')
    }
  }, 'name should be lowercase, trimmed, alphabetical strings')

  t.end()
})
