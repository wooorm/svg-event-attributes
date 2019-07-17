'use strict'

var fs = require('fs')
var https = require('https')
var bail = require('bail')
var concat = require('concat-stream')
var alphaSort = require('alpha-sort')
var unified = require('unified')
var parse = require('rehype-parse')
var q = require('hast-util-select')
var toString = require('hast-util-to-string')
var ev = require('hast-util-is-event-handler')

var proc = unified().use(parse)

var actual = 0
var expected = 3

var all = []

https.get('https://www.w3.org/TR/SVG11/attindex.html', onsvg1)
https.get('https://www.w3.org/TR/SVGTiny12/attributeTable.html', ontiny)
https.get('https://www.w3.org/TR/SVG2/attindex.html', onsvg2)

function onsvg1(res) {
  res.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var tree = proc.parse(buf)
    var list = []
    var nodes = q.selectAll('.property-table tr', tree)

    if (nodes.length === 0) {
      throw new Error('Couldn’t find rows in SVG 1')
    }

    nodes.forEach(each)

    done(list)

    function each(node) {
      q.selectAll('.attr-name', node).forEach(every)

      function every(name) {
        var value = clean(toString(name))
        if (ev(value)) {
          list.push(value)
        }
      }
    }

    function clean(value) {
      return value.replace(/[‘’]/g, '')
    }
  }
}

function ontiny(res) {
  res.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var tree = proc.parse(buf)
    var list = []
    var nodes = q.selectAll('#attributes .attribute', tree)

    if (nodes.length === 0) {
      throw new Error('Couldn’t find nodes in SVG Tiny')
    }

    nodes.forEach(each)

    done(list)

    function each(node) {
      var value = toString(q.select('.attribute-name', node))
      if (ev(value)) {
        list.push(value)
      }
    }
  }
}

function onsvg2(res) {
  res.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var tree = proc.parse(buf)
    var list = []
    var nodes = q.selectAll('tbody tr', tree)

    if (nodes.length === 0) {
      throw new Error('Couldn’t find nodes in SVG 2')
    }

    nodes.forEach(each)

    done(list)

    function each(node) {
      var value = toString(q.select('.attr-name span', node))
      if (ev(value)) {
        list.push(value)
      }
    }
  }
}

function done(list) {
  all = all.concat(list)

  actual++

  if (actual === expected) {
    fs.writeFile(
      'index.json',
      JSON.stringify(all.filter(unique).sort(alphaSort.ascending), 0, 2) + '\n',
      bail
    )
  }
}

function unique(d, i, data) {
  return data.indexOf(d) === i
}
