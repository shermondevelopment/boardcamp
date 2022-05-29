/** express router */
import { Router } from 'express'

/** router */
const router = Router()

/** categorys controller */
import { ListCategory, AddCategory } from '../controllers/categories/index.js'

/** games */
import { CreateGame, ListGame } from '../controllers/game/index.js'

/** customers */
import { CreateCustomer, ListCustomer } from '../controllers/customers/index.js'

/**middleware  */
import { validateMiddleware } from '../middlewares/validation.js'

/* categorys */
router.get('/categories', ListCategory)
router.post('/categories', AddCategory)

/** customers */
router.post('/customers', validateMiddleware, CreateCustomer)
router.get('/customers', ListCustomer)

/** games */
router.post('/games', CreateGame)
router.get('/games', ListGame)

export default router
