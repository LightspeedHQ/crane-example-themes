import { createVueServerApp } from '@lightspeed/crane'

import type { Content, Design } from '../../type.ts'
import { normalizeServerSlotData } from '../normalize-server-data.ts'
import CustomCatalog from './CustomCatalog.vue'

const serverApp = createVueServerApp<Content, Design>(CustomCatalog)

export default {
	init() {
		const app = serverApp.init()

		return {
			render(
				context: Parameters<typeof app.render>[0],
				data: Parameters<typeof app.render>[1],
			) {
				return app.render(context, normalizeServerSlotData(data))
			},
		}
	},
}
