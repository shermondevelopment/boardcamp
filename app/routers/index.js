/** express router */
import { Router } from 'express'

/** router */
const router = Router()

/** categorys controller */
import { ListCategory } from '../controllers/categories/index.js'

/* categorys */
router.get('/categories', ListCategory)

export default router
