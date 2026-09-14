import { createVueClientApp } from '@lightspeed/crane'

import type { Content, Design } from '../../type.ts'
import CustomCategory from './CustomCategory.vue'

export default createVueClientApp<Content, Design>(CustomCategory)
