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
    console.log(error)
    res.status(500).json({ error: 'internal server error' })
  }
}

export const ListCustomer = async (req, res) => {
  try {
    const cpf = req.query.cpf || ''

    const customers = await db.query(
      `select * from customers where cpf like $1 || '%'`,
      [cpf]
    )

    res.status(200).json(customers.rows)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const ListCustomerId = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'id is requried' })
    }

    const customer = await db.query('select * from customers where id = $1', [
      id
    ])

    if (customer.rowCount <= 0) {
      return res.sendStatus(404)
    }

    res.status(200).json(customer.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'internal server error' })
  }
}

export const UpdateCustomer = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'id is requried' })
    }

    const { name, phone, cpf, birthday } = res.locals.customer

    const customer = await db.query('select * from customers where cpf = $1', [
      cpf
    ])

    if (customer.rowCount > 0 && customer.rows[0]?.id !== id) {
      return res.sendStatus(409)
    }

    await db.query(
      'update customers set name = $1, phone = $2, cpf = $3, birthday = $4',
      [name, phone, cpf, birthday]
    )
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'internal server error' })
  }
}
