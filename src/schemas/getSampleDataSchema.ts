import * as Joi from 'joi';

export default {
    params: Joi.object().keys({
        id: Joi.number().required()
    }),
};