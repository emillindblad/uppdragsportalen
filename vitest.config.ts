import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    //deps: { interopDefault: false, inline: true },
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
})

