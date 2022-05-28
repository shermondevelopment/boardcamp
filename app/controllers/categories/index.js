/* conenct how db */
import db from '../../database/db.js'

export const ListCategory = async (req, res) => {
  try {
    const categorys = await db.query('select * from categories')
    res.status(200).json(categorys.rows)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

export const AddCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.sendStatus(400)
    }

    const search = await db.query('select * from categories where name = $1', [
      name
    ])

    if (search.rowCount > 0) {
      return res.sendStatus(409)
    }
    await db.query('insert into categories (name) values($1)', [name])

    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}
