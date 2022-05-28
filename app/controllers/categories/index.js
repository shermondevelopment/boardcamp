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
