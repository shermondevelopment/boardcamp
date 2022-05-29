/** express router */
import { Router } from 'express'

/** router */
const router = Router()

/** categorys controller */
import { ListCategory, AddCategory } from '../controllers/categories/index.js'

/** games */
import { CreateGame, ListGame } from '../controllers/game/index.js'

/** customers */
import {
  CreateCustomer,
  ListCustomer,
  ListCustomerId,
  UpdateCustomer
} from '../controllers/customers/index.js'

/**rentals  */
import {
  ListRentals,
  CreateRentals,
  FinishRentals,
  DelRentals
} from '../controllers/rentals/index.js'

/**middleware  */
import { validateMiddleware } from '../middlewares/validation.js'

/* categorys */
router.get('/categories', ListCategory)
router.post('/categories', AddCategory)

/** customers */
router.post('/customers', validateMiddleware, CreateCustomer)
router.get('/customers', ListCustomer)
router.get('/customers/:id', ListCustomerId)
router.put('/customers/:id', validateMiddleware, UpdateCustomer)

/** games */
router.post('/games', CreateGame)
router.get('/games', ListGame)

/** rentals */
router.get('/rentals', ListRentals)
router.post('/rentals', CreateRentals)
router.post('/rentals/:id/return', FinishRentals)
router.delete('/rentals/:id', DelRentals)

export default router
