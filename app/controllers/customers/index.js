/** db */
import db from '../../database/db.js'

export const CreateCustomer = async (req, res) => {
  try {
    const { name, phone, cpf, birthday } = res.locals.customer

    const customer = await db.query('select * from customers where cpf = $1', [
      cpf
    ])

    if (customer.rowCount > 0) {
      return res.status(409).json({ error: 'cpf is already registered' })
    }
    await db.query(
      'insert into customers (name, phone, cpf, birthday) values($1, $2, $3, $4)',
      [name, phone, cpf, birthday]
    )
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}
