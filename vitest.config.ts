import { loadEnvConfig } from '@next/env'
import { configDefaults, defineConfig } from 'vitest/config'

loadEnvConfig(process.cwd());

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude, 'packages/template/*'],
        environment: "jsdom",
        globals: true,
        //deps: { interopDefault: false, inline: true },
        coverage: {
            provider: 'istanbul',
            reportsDirectory: './__tests__/coverage'
        },
    },
})

