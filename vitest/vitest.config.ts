import { configDefaults, defineConfig } from 'vitest/config'
import t3env from './t3env'

//import("./src/env/server.mjs")


console.log("AAAAAAAAAAAAAAAAAAAAA")

console.log(t3env)

export default defineConfig({
  test: {
    environment: 'T3',
    //globals: true,
    //deps: { interopDefault: false, inline: true },
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
})

