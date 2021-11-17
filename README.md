<br/>
<p align="center">
    <img src="https://fireworks.js.org/images/fireworks_emoji.png" />
</p>

<p align="center"><b>Fireworks.js</b></p>
<p align="center">A simple fireworks library!</p>

<br/>
<p align="center">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/crashmax-dev/fireworks-js/github-pages">
    <a href="https://www.npmjs.com/package/fireworks-js" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/fireworks-js"></a>
    <img alt="npm" src="https://img.shields.io/npm/dt/fireworks-js?color=blue">
    <a href="https://bundlephobia.com/package/fireworks-js@latest"><img alt="npm bundle size" src="https://badgen.net/bundlephobia/minzip/fireworks-js"></a>
    <a href="https://www.codefactor.io/repository/github/crashmax-dev/fireworks-js"><img src="https://www.codefactor.io/repository/github/crashmax-dev/fireworks-js/badge" alt="CodeFactor" /></a>
</p>

## Features

 - 🔥 No [dependencies](https://www.npmjs.com/package/fireworks-js?activeTab=dependents).
 - ⚙️ Flexible [configuration](#options).
 - 📦 Lightweight ([~3.0kB gizpped](https://bundlephobia.com/package/fireworks-js))
 - ☁️ [Server-side rendering](#server-side-rendering-with-no-ssr) compatibility. 
 - 📜 Supports [TypeScript](https://www.typescriptlang.org) type definition.

## Demo

You can play with `fireworks-js` on [fireworks.js.org](https://fireworks.js.org) or [codesandbox.io](https://codesandbox.io/s/fireworks-js-qxihw)

[![Edit fireworks-js](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/fireworks-js-qxihw)

## Installation

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/installation.sh) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/installation.sh -->
```sh
# with npm:
npm install fireworks-js

# or yarn:
yarn add fireworks-js
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/usage.js) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/usage.js -->
```js
import { Fireworks } from 'fireworks-js'

const container = document.querySelector('.fireworks-container')
const fireworks = new Fireworks(container, { /* options */ })

fireworks.start()
fireworks.pause()
fireworks.clear()

// stop and clear fireworks
fireworks.stop()

// after initialization you can change the fireworks parameters
fireworks.setOptions({ delay: { min: 10, max: 15 }})
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## CDN

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/usage-cdn.html) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/usage-cdn.html -->
```html
<script src="https://unpkg.com/fireworks-js@latest/dist/fireworks.js"></script>
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Usage in React (see detailed usage [here](examples/react.tsx))

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/usage-react.js) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/usage-react.js -->
```js
import { Fireworks } from 'fireworks-js/dist/react'

export const App = () => {
  const options = {
    speed: 3
  }

  const style = {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#000'
  }

  return <Fireworks options={options} style={style} />
}
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Server-Side Rendering ([with-no-ssr](https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr))

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/ssr-next.js) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/ssr-next.js -->
```js
// components/Fireworks.tsx
import { Fireworks } from 'fireworks-js/dist/react'

export default () => <Fireworks />

// pages/index.tsx
import dynamic from 'next/dynamic'

const FireworksWithNoSSR = dynamic(
  () => import('../components/Fireworks'),
  { ssr: false }
)
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Options

<!-- MARKDOWN-AUTO-DOCS:START (JSON_TO_HTML_TABLE:src=./.github/markdown-autodocs/options.json) -->
<table class="JSON-TO-HTML-TABLE"><thead><tr><th class="name-th">Name</th><th class="type-th">Type</th><th class="default-th">Default</th><th class="description-th">Description</th></tr></thead><tbody ><tr ><td class="name-td td_text">rocketsPoint</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>50 // bottom center</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">opacity</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>0.5</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">speed</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>2</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">acceleration</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>1.05</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">friction</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>0.95</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">gravity</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>1.5</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">particles</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>50</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">trace</td><td class="type-td td_text">number</td><td class="default-td td_text"><code>3</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">explosion</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>5</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">autoresize</td><td class="type-td td_text"><code>boolean</code></td><td class="default-td td_text"><code>true</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">hue</td><td class="type-td td_text"><code>object</code></td><td class="default-td td_text"><code>{ min: 0, max: 360 }</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">delay</td><td class="type-td td_text"><code>object</code></td><td class="default-td td_text"><code>{ min: 15, max: 30 }</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">boundaries</td><td class="type-td td_text"><code>object</code></td><td class="default-td td_text"><code>{ visible: false, x: 50, y: 50, width: container.clientWidth, height: container.clientHeight }</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">sound.enabled</td><td class="type-td td_text"><code>boolean</code></td><td class="default-td td_text"><code>false</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">sound.files</td><td class="type-td td_text"><code>string[]</code></td><td class="default-td td_text"><code>[ 'explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3' ]</code></td><td class="description-td td_text">https://github.com/crashmax-dev/fireworks-js/tree/master/public/sounds</td></tr>
<tr ><td class="name-td td_text">sound.volume</td><td class="type-td td_text"><code>object</code></td><td class="default-td td_text"><code>{ min: 1, max: 2 }</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">mouse</td><td class="type-td td_text"><code>object</code></td><td class="default-td td_text"><code>{ click: false, move: false, max: 3 }</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">brightness</td><td class="type-td td_text"><code>object</code></td><td class="default-td td_text"><code>{ min: 50, max: 80 }</code></td><td class="description-td td_text">-</td></tr>
<tr ><td class="name-td td_text">brightness.decay</td><td class="type-td td_text"><code>object</code></td><td class="default-td td_text"><code>{ min: 0.015, max: 0.03 }</code></td><td class="description-td td_text">-</td></tr></tbody></table>
<!-- MARKDOWN-AUTO-DOCS:END -->

## License
MIT License © 2021 [Vitalij Ryndin](https://github.com/crashmax-deb)
