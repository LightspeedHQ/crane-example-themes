import { createVueClientApp } from '@lightspeed/crane'

import type { Content, Design } from '../../type.ts'
import RelatedProducts from './RelatedProducts.vue'

export default createVueClientApp<Content, Design>(RelatedProducts)
