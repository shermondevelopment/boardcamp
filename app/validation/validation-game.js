import Joi from 'joi'

const gameValidation = Joi.object({
  name: Joi.string()
    .required()
    .error(() => 'name is required!'),
  image: Joi.string()
    .required()
    .error(() => 'image is required'),
  stockTotal: Joi.number()
    .required()
    .min(1)
    .error(() => 'stock is required'),
  categoryId: Joi.number()
    .required()
    .error(() => 'category is required'),
  pricePerDay: Joi.number()
    .min(1)
    .required()
    .error(() => 'pricePerDay is required')
})

export default gameValidation
