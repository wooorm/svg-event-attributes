import assert from 'node:assert/strict'
import test from 'node:test'
import {svgEventAttributes} from './index.js'

test('svgEventAttributes', function () {
  assert.ok(Array.isArray(svgEventAttributes), 'should be an array')

  let index = -1

  while (++index < svgEventAttributes.length) {
    const prop = svgEventAttributes[index]
    assert.equal(typeof prop, 'string', prop + ' should be string')
    assert.strictEqual(prop, prop.trim(), prop + ' should be trimmed')
    assert.ok(/^on[a-z]+$/.test(prop), prop + ' should be `a-z`')
  }
})
