import Joi from '@hapi/joi'

class TicketValidator {
  async onCreate (obj) {
    const schemaKeys = {
      title: Joi.string(),
      completed: Joi.boolean()
    }

    const schema = Joi.object().keys(schemaKeys)
    const { error } = schema.validate(obj, { abortEarly: false })
    return error
  }

  async onUpdate (obj) {
    const schemaKeys = {
      id: Joi.string(),
      title: Joi.string()
    }

    const schema = Joi.object().keys(schemaKeys)
    const { error } = schema.validate(obj, { abortEarly: false })
    return error
  }
}

export default new TicketValidator()
