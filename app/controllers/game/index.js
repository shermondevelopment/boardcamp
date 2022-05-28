/** db */
import db from '../../database/db.js'

/** validation schema */
import validation from '../../utils/validation.js'

/** joi */
import gameValidation from '../../validation/validation-game.js'

export const CreateGame = async (req, res) => {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    const inputIsValid = await validation(req.body, gameValidation)

    if (inputIsValid) {
      return res.status(422).json({ error: inputIsValid })
    }

    const categoryExists = await db.query(
      'select * from categories where id = $1',
      [categoryId]
    )

    if (categoryExists.rowCount <= 0) {
      return res.sendStatus(400)
    }

    const gameSearch = await db.query('select * from games where name = $1', [
      name
    ])

    if (gameSearch.rowCount > 0) {
      return res.sendStatus(409)
    }

    await db.query('insert into games values(default, $1, $2, $3, $4, $5)', [
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay
    ])

    res.sendStatus(201)
  } catch (error) {
    res.status(200).json({ error: 'internal server error' })
  }
}
