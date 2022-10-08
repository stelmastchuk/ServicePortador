import Joi from 'joi';

export const schemaCreatePortador = Joi.object({
    cpf: Joi.string().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    issuerId: Joi.string().required()
})

export const schemaDeleteAccount = Joi.object({
    cpf: Joi.string().required(),
})