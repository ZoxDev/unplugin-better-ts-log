## unplugin-better-ts-log

This plugin aim to enhance your dev tools log experience.

## How it works ?

Just install the plugin and then your console log should transform with a vscode deeplink : 

don't forget to include the files to transform.
```ts
		betterTsLog({
      exclude: './node_modules'
			include: './src',
		}),
```

- from : `console.log(123, ["123"], "123", { test: "test" });`
- to : `console.log("from: vscode://file//Users/your-user/projects/unplugin-better-ts-log/src/log.ts:1:1 --> ", 123,  ["123"],  "123",  { test: "test" });`

### Install

```bash
npm i unplugin-better-ts-log
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-better-ts-log/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-better-ts-log/rollup'

export default {
  plugins: [
    Starter({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-better-ts-log/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-better-ts-log/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-better-ts-log/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from 'unplugin-better-ts-log/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>
