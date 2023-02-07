import { loadEnvConfig } from '@next/env'
import { configDefaults, defineConfig } from 'vitest/config'

loadEnvConfig(process.cwd());

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    //deps: { interopDefault: false, inline: true },
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
})

