import { createVueServerApp } from '@lightspeed/crane'

import CustomBottomBar from './CustomBottomBar.vue'
import { Content, Design } from '../../type.ts'

export default createVueServerApp<Content, Design>(CustomBottomBar)
