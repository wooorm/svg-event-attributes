import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import fetch from 'node-fetch'
import alphaSort from 'alpha-sort'
import {fromHtml} from 'hast-util-from-html'
import {select, selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {isEventHandler} from 'hast-util-is-event-handler'

/** @type {Set<string>} */
const set = new Set()

// SVG 1.1.
const response1 = await fetch('https://www.w3.org/TR/SVG11/attindex.html')
const text1 = await response1.text()

const nodes1 = selectAll('.property-table tr', fromHtml(text1))
let index = -1

if (nodes1.length === 0) {
  throw new Error('Couldn’t find rows in SVG 1')
}

while (++index < nodes1.length) {
  const names = selectAll('.attr-name', nodes1[index])
  let offset = -1

  while (++offset < names.length) {
    const value = toString(names[offset]).replace(/[‘’]/g, '')

    if (isEventHandler(value)) set.add(value)
  }
}

// SVG Tiny.
const responseTiny = await fetch(
  'https://www.w3.org/TR/SVGTiny12/attributeTable.html'
)
const textTiny = await responseTiny.text()

const nodesTiny = selectAll('#attributes .attribute', fromHtml(textTiny))
index = -1

if (nodesTiny.length === 0) {
  throw new Error('Couldn’t find nodes in SVG Tiny')
}

while (++index < nodesTiny.length) {
  const name = select('.attribute-name', nodesTiny[index])
  assert(name, 'expeted `name` node')
  const value = toString(name)

  if (isEventHandler(value)) set.add(value)
}

// SVG 2.
const response2 = await fetch('https://www.w3.org/TR/SVG2/attindex.html')
const text2 = await response2.text()

const nodes2 = selectAll('tbody tr', fromHtml(text2))
index = -1

if (nodes2.length === 0) {
  throw new Error('Couldn’t find nodes in SVG 2')
}

while (++index < nodes2.length) {
  const name = select('.attr-name span', nodes2[index])
  assert(name, 'expeted `name` node')
  const value = toString(name)

  if (isEventHandler(value)) set.add(value)
}

await fs.writeFile(
  'index.js',
  [
    '/**',
    ' * List of SVG event handler attributes.',
    ' *',
    ' * @type {Array<string>}',
    ' */',
    'export const svgEventAttributes = ' +
      JSON.stringify([...set].sort(alphaSort()), null, 2),
    ''
  ].join('\n')
)
