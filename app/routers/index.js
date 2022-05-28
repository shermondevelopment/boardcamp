/** express router */
import { Router } from 'express'

/** router */
const router = Router()

/** categorys controller */
import { ListCategory, AddCategory } from '../controllers/categories/index.js'

/** games */
import { CreateGame } from '../controllers/game/index.js'

/* categorys */
router.get('/categories', ListCategory)
router.post('/categories', AddCategory)

/** games */
router.post('/games', CreateGame)

export default router
