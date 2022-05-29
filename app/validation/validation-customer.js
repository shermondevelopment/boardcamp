import Joi from 'joi'

const customerValidation = Joi.object({
  name: Joi.string()
    .required()
    .error((error) => error),
  phone: Joi.string()
    .required()
    .min(10)
    .error((error) => error),
  cpf: Joi.string()
    .required()
    .min(11)
    .error((error) => error),
  birthday: Joi.date().required()
})

export default customerValidation
