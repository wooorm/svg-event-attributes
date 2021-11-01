import fs from 'node:fs'
import https from 'node:https'
import {bail} from 'bail'
import concatStream from 'concat-stream'
import alphaSort from 'alpha-sort'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import {select, selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {isEventHandler} from 'hast-util-is-event-handler'

const processor = unified().use(rehypeParse)

let actual = 0
const expected = 3

/** @type {Set<string>} */
const set = new Set()

https.get('https://www.w3.org/TR/SVG11/attindex.html', (response) => {
  response
    .pipe(
      concatStream((buf) => {
        const tree = processor.parse(buf)
        const nodes = selectAll('.property-table tr', tree)
        let index = -1

        if (nodes.length === 0) {
          throw new Error('Couldn’t find rows in SVG 1')
        }

        while (++index < nodes.length) {
          const names = selectAll('.attr-name', nodes[index])
          let offset = -1

          while (++offset < names.length) {
            const value = toString(names[offset]).replace(/[‘’]/g, '')

            if (isEventHandler(value)) set.add(value)
          }
        }

        done()
      })
    )
    .on('error', bail)
})

https.get('https://www.w3.org/TR/SVGTiny12/attributeTable.html', (response) => {
  response
    .pipe(
      concatStream((buf) => {
        const tree = processor.parse(buf)
        const nodes = selectAll('#attributes .attribute', tree)
        let index = -1

        if (nodes.length === 0) {
          throw new Error('Couldn’t find nodes in SVG Tiny')
        }

        while (++index < nodes.length) {
          const value = toString(select('.attribute-name', nodes[index]))

          if (isEventHandler(value)) set.add(value)
        }

        done()
      })
    )
    .on('error', bail)
})

https.get('https://www.w3.org/TR/SVG2/attindex.html', (response) => {
  response
    .pipe(
      concatStream((buf) => {
        const tree = processor.parse(buf)
        const nodes = selectAll('tbody tr', tree)
        let index = -1

        if (nodes.length === 0) {
          throw new Error('Couldn’t find nodes in SVG 2')
        }

        while (++index < nodes.length) {
          const value = toString(select('.attr-name span', nodes[index]))

          if (isEventHandler(value)) set.add(value)
        }

        done()
      })
    )
    .on('error', bail)
})

function done() {
  actual++

  if (actual === expected) {
    fs.writeFile(
      'index.js',
      'export const svgEventAttributes = ' +
        JSON.stringify([...set].sort(alphaSort()), null, 2) +
        '\n',
      bail
    )
  }
}
