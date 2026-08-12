import { createVueClientApp } from '@lightspeed/crane'

import CustomBottomBar from './CustomBottomBar.vue'
import { Content, Design } from '../../type.ts'

export default createVueClientApp<Content, Design>(CustomBottomBar)
