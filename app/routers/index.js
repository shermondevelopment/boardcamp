/** express router */
import { Router } from 'express'

/** router */
const router = Router()

/** categorys controller */
import { ListCategory, AddCategory } from '../controllers/categories/index.js'

/* categorys */
router.get('/categories', ListCategory)
router.post('/categories', AddCategory)

export default router
