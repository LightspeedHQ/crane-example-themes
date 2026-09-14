import { createVueClientApp } from '@lightspeed/crane'

import type { Content, Design } from '../../type.ts'
import CustomCatalog from './CustomCatalog.vue'

export default createVueClientApp<Content, Design>(CustomCatalog)
