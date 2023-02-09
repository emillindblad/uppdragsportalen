import { loadEnvConfig } from '@next/env'
import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

loadEnvConfig(process.cwd());

export default defineConfig({
    plugins: [ react() ],
    test: {
        exclude: [...configDefaults.exclude, 'packages/template/*'],
        environment: "jsdom",
        globals: true,
        coverage: {
            provider: 'istanbul',
            reportsDirectory: './__tests__/coverage'
        },
    },
})

