import type { Environment } from 'vitest'

export default <Environment>{
    name: 'T3',
    setup() {

        return {
            teardown() {
                console.log('wa')
            }
        }
    }

}
