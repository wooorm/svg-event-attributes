# svg-event-attributes

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of SVG event handler content attributes.

Includes events from [SVG 1.1][1.1], [SVG Tiny 1.2][1.2], and [SVG 2][2.0].

## Install

[npm][]:

```sh
npm install svg-event-attributes
```

## Use

```js
var svgEventAttributes = require('svg-event-attributes')

console.log(svgEventAttributes.slice(0, 10))
```

Yields:

```js
[
  'onabort',
  'onactivate',
  'onafterprint',
  'onbeforeprint',
  'onbegin',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick'
]
```

## API

### `svgEventAttributes`

`Array.<string>` — List of SVG event handler content attributes.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/svg-event-attributes.svg

[build]: https://travis-ci.org/wooorm/svg-event-attributes

[downloads-badge]: https://img.shields.io/npm/dm/svg-event-attributes.svg

[downloads]: https://www.npmjs.com/package/svg-event-attributes

[size-badge]: https://img.shields.io/bundlephobia/minzip/svg-event-attributes.svg

[size]: https://bundlephobia.com/result?p=svg-event-attributes

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[1.1]: https://www.w3.org/TR/SVG/attindex.html

[1.2]: https://www.w3.org/TR/SVGTiny12/attributeTable.html

[2.0]: https://www.w3.org/TR/SVG2/attindex.html
