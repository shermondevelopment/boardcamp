/** connect database */
import db from '../../database/db.js'

export const ListRentals = async (req, res) => {
  try {
    const rentals = await db.query('select * from rentals')

    return res.status(200).json(rentals.rows)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}
