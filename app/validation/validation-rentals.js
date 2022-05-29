import Joi from 'joi'

const rentalsValidation = Joi.object({
  customerId: Joi.number()
    .required()
    .error((error) => error),
  gameId: Joi.number()
    .min(1)
    .required()
    .error((error) => error),
  daysRented: Joi.number()
    .required()
    .error((error) => error)
})

export default rentalsValidation
