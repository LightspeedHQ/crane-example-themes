import { createLayoutApp } from '@lightspeed/crane-api'

import Main from './Main.vue'
import { Content, Design } from './type.ts'

export default createLayoutApp<Content, Design>(Main)
