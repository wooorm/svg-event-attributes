import fs from 'fs'
import https from 'https'
import bail from 'bail'
import concat from 'concat-stream'
import alphaSort from 'alpha-sort'
import unified from 'unified'
import parse from 'rehype-parse'
import q from 'hast-util-select'
import toString from 'hast-util-to-string'
import ev from 'hast-util-is-event-handler'

var proc = unified().use(parse)

var actual = 0
var expected = 3

var all = []

https.get('https://www.w3.org/TR/SVG11/attindex.html', onsvg1)
https.get('https://www.w3.org/TR/SVGTiny12/attributeTable.html', ontiny)
https.get('https://www.w3.org/TR/SVG2/attindex.html', onsvg2)

function onsvg1(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var tree = proc.parse(buf)
    var list = []
    var nodes = q.selectAll('.property-table tr', tree)
    var index = -1
    var offset
    var names
    var value

    if (nodes.length === 0) {
      throw new Error('Couldn’t find rows in SVG 1')
    }

    while (++index < nodes.length) {
      names = q.selectAll('.attr-name', nodes[index])
      offset = -1
      while (++offset < names.length) {
        value = clean(toString(names[offset]))
        if (ev(value)) list.push(value)
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
    var tree = proc.parse(buf)
    var list = []
    var nodes = q.selectAll('#attributes .attribute', tree)
    var index = -1
    var value

    if (nodes.length === 0) {
      throw new Error('Couldn’t find nodes in SVG Tiny')
    }

    while (++index < nodes.length) {
      value = toString(q.select('.attribute-name', nodes[index]))
      if (ev(value)) list.push(value)
    }

    done(list)
  }
}

function onsvg2(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var tree = proc.parse(buf)
    var list = []
    var nodes = q.selectAll('tbody tr', tree)
    var index = -1
    var value

    if (nodes.length === 0) {
      throw new Error('Couldn’t find nodes in SVG 2')
    }

    while (++index < nodes.length) {
      value = toString(q.select('.attr-name span', nodes[index]))
      if (ev(value)) list.push(value)
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
      'export var svgEventAttributes = ' +
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
