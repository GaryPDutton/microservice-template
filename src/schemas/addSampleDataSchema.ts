import * as Joi from 'joi';

export default {
    body: Joi.object().keys({
            name: Joi.string().required()
        })
};