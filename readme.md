# svg-event-attributes

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of SVG event handler content attributes.

Includes events from [SVG 1.1][1.1], [SVG Tiny 1.2][1.2], and [SVG 2][2.0].

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install svg-event-attributes
```

## Use

```js
import {svgEventAttributes} from 'svg-event-attributes'

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

This package exports the following identifiers: `svgEventAttributes`.
There is no default export.

### `svgEventAttributes`

`Array.<string>` — List of SVG event handler content attributes.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://github.com/wooorm/svg-event-attributes/workflows/main/badge.svg

[build]: https://github.com/wooorm/svg-event-attributes/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/svg-event-attributes.svg

[coverage]: https://codecov.io/github/wooorm/svg-event-attributes

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
