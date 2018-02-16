import * as Joi from 'joi';

export default {
    params: Joi.object().keys({
        id: Joi.number().required()
    }),
    body: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required()
    })
};