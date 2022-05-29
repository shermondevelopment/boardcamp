/** connect database */
import db from '../../database/db.js'

/** validation */
import validation from '../../utils/validation.js'

/** schema validation */
import rentalsValidation from '../../validation/validation-rentals.js'

/** datefns */
import { set, differenceInDays } from 'date-fns'

export const ListRentals = async (req, res) => {
  try {
    const rentals = await db.query('select * from rentals')

    return res.status(200).json(rentals.rows)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const CreateRentals = async (req, res) => {
  try {
    const inputIsValid = await validation(req.body, rentalsValidation)

    if (inputIsValid) {
      return res.status(400).json({ error: inputIsValid })
    }

    const customer = await db.query('select * from customers where id = $1', [
      req.body.customerId
    ])

    const game = await db.query('select * from games where id = $1', [
      req.body.gameId
    ])

    if (
      customer.rowCount <= 0 ||
      game.rowCount <= 0 ||
      req.body.daysRented <= 0
    ) {
      return res.sendStatus(400)
    }

    const rentals = await db.query(
      'select * from rentals where "returnDate" is null and "gameId" = $1',
      [parseInt(req.body.gameId)]
    )

    if (game.rows[0].stockTotal <= rentals.rowCount) {
      return res.sendStatus(400)
    }

    await db.query(
      'insert into rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") values ($1, $2, $3, $4, $5, $6, $7) ',
      [
        req.body.customerId,
        req.body.gameId,
        new Date(),
        req.body.daysRented,
        null,
        req.body.daysRented * game.rows[0].pricePerDay,
        null
      ]
    )

    res.status(201).json(rentals.rows)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const FinishRentals = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send('id is required')
    }

    let delayFee = 0

    const rentals = await db.query('select * from rentals where id = $1', [id])

    if (rentals.rowCount <= 0) {
      return res.sendStatus(404)
    }

    if (rentals.rows[0].returnDate != null) {
      return res.sendStatus(400)
    }

    const returnDay = set(rentals.rows[0].rentDate, {
      date:
        new Date(rentals.rows[0].rentDate).getDate() +
        rentals.rows[0].daysRented
    })

    const dayDiference = differenceInDays(new Date(), returnDay)

    const game = await db.query('select * from games where id = $1', [
      rentals.rows[0].gameId
    ])

    if (new Date() > returnDay && dayDiference > 0) {
      delayFee = delayFee + game.rows[0].pricePerDay * dayDiference
    }

    await db.query(
      'update rentals set "returnDate" = now(), "delayFee" = $2 where id = $1',
      [id, delayFee]
    )

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('interval server error')
  }
}
