import { createVueClientApp } from '@lightspeed/crane'

import type { Content, Design } from '../../type.ts'
import CustomProductDetails from './CustomProductDetails.vue'

export default createVueClientApp<Content, Design>(CustomProductDetails)
