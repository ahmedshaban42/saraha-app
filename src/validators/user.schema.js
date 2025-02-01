import Joi from "joi";

export const updatepasswordSchema={
    body:Joi.object({
        oldPassword:Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/)
        .messages({
            "string.pattern.base":"password must be contain 8 characters at least and contain uppercase and louercace "
        }),

        newPasswoed:Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/),

        confirmPassword:Joi.string()
                .required()
                .valid(Joi.ref('newPasswoed'))
                .messages({
                    "any.only":"passwoed and confirm password is not match"
                }),
        

    })
}

export const updateProfileSchema={
    body:Joi.object({
        username:Joi.string()
        .alphanum()
        .required()
        .messages({
            "string.alphanum":"username must be contain only a-z , A-Z and 0-9",
            "string.base":"username must be a string",
            "string.length":"username must be 10 chracters long",
            "any.required":"username is required"
        }),
        phone:Joi.string().required(),
        email:Joi.string()
        .email({
            tlds:{
                allow:['com'],
                deny:['net','org']
            },
            maxDomainSegments:2,
            multiple:true,
            separator:'&'
        })
        .required(),
        age:Joi.string().alphanum().required(),
    })

}