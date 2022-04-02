# svg-event-attributes

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of SVG event handler attributes.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`svgEventAttributes`](#svgeventattributes)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is a list of all SVG event handlers (`onclick`, etc).
It includes events from [SVG 1.1][1.1], [SVG Tiny 1.2][1.2], and [SVG 2][2.0].

## When should I use this?

You can use this package if you want to figure out whether an HTML attribute is
a known event handler.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install svg-event-attributes
```

In Deno with [`esm.sh`][esmsh]:

```js
import {svgEventAttributes} from 'https://esm.sh/svg-event-attributes@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {svgEventAttributes} from 'https://esm.sh/svg-event-attributes@2?bundle'
</script>
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

List of SVG event handler attributes (`Array<string>`).

## Types

This package is fully typed with [TypeScript][].

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
It also works in Deno and modern browsers.

## Security

This package is safe.

## Related

*   [`wooorm/html-event-attributes`](https://github.com/wooorm/html-event-attributes)
    — list of HTML event attributes
*   [`wooorm/svg-element-attributes`](https://github.com/wooorm/svg-element-attributes)
    — map of SVG elements to attributes
*   [`wooorm/html-element-attributes`](https://github.com/wooorm/html-element-attributes)
    — map of HTML elements to attributes
*   [`wooorm/aria-attributes`](https://github.com/wooorm/aria-attributes)
    — list of ARIA attributes

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

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

[esmsh]: https://esm.sh

[license]: license

[author]: https://wooorm.com

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[1.1]: https://www.w3.org/TR/SVG/attindex.html

[1.2]: https://www.w3.org/TR/SVGTiny12/attributeTable.html

[2.0]: https://www.w3.org/TR/SVG2/attindex.html
