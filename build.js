import fs from 'node:fs'
import https from 'node:https'
import {bail} from 'bail'
import concat from 'concat-stream'
import alphaSort from 'alpha-sort'
import {unified} from 'unified'
import parse from 'rehype-parse'
import {select, selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {isEventHandler} from 'hast-util-is-event-handler'

const proc = unified().use(parse)

let actual = 0
const expected = 3

let all = []

https.get('https://www.w3.org/TR/SVG11/attindex.html', onsvg1)
https.get('https://www.w3.org/TR/SVGTiny12/attributeTable.html', ontiny)
https.get('https://www.w3.org/TR/SVG2/attindex.html', onsvg2)

function onsvg1(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    const tree = proc.parse(buf)
    const list = []
    const nodes = selectAll('.property-table tr', tree)
    let index = -1
    let offset
    let names
    let value

    if (nodes.length === 0) {
      throw new Error('Couldn’t find rows in SVG 1')
    }

    while (++index < nodes.length) {
      names = selectAll('.attr-name', nodes[index])
      offset = -1
      while (++offset < names.length) {
        value = clean(toString(names[offset]))
        if (isEventHandler(value)) list.push(value)
      }
    }

    done(list)

    function clean(value) {
      return value.replace(/[‘’]/g, '')
    }
  }
}

function ontiny(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    const tree = proc.parse(buf)
    const list = []
    const nodes = selectAll('#attributes .attribute', tree)
    let index = -1
    let value

    if (nodes.length === 0) {
      throw new Error('Couldn’t find nodes in SVG Tiny')
    }

    while (++index < nodes.length) {
      value = toString(select('.attribute-name', nodes[index]))
      if (isEventHandler(value)) list.push(value)
    }

    done(list)
  }
}

function onsvg2(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    const tree = proc.parse(buf)
    const list = []
    const nodes = selectAll('tbody tr', tree)
    let index = -1
    let value

    if (nodes.length === 0) {
      throw new Error('Couldn’t find nodes in SVG 2')
    }

    while (++index < nodes.length) {
      value = toString(select('.attr-name span', nodes[index]))
      if (isEventHandler(value)) list.push(value)
    }

    done(list)
  }
}

function done(list) {
  all = all.concat(list)

  actual++

  if (actual === expected) {
    fs.writeFile(
      'index.js',
      'export const svgEventAttributes = ' +
        JSON.stringify(
          all.filter((d, i, data) => data.indexOf(d) === i).sort(alphaSort()),
          null,
          2
        ) +
        '\n',
      bail
    )
  }
}
