/** validate */
import customerValidation from '../validation/validation-customer.js'

/** utils */
import validation from '../utils/validation.js'

export const validateMiddleware = async (req, res, next) => {
  try {
    const { name, phone, cpf, birthday } = req.body

    if (!/\d{4}-\d{2}-\d{2}/.test('1999-02-02')) {
      return res.status(400).json({ error: 'invalid type formart date' })
    }

    const inputIsValid = await validation(
      { name, phone, cpf, birthday },
      customerValidation
    )

    if (inputIsValid) {
      return res.status(400).json({ error: inputIsValid })
    }

    res.locals.customer = req.body
    next()
  } catch (error) {
    res.status(500).send('internal server error')
  }
}
