import Joi from "joi";




export const sendMessageSchema = {
    body: Joi.object({
        body: Joi.string().required(),
        ownerId: Joi.string().hex().length(24).required() 
    })
};
