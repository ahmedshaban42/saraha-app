import Joi from "joi";

export const signUpSchema={
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

        password:Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/)
        .messages({
            "string.pattern.base":"password must be contain 8 characters at least and contain uppercase and louercace "
        }),

        confirmPassword:Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            "any.only":"passwoed and confirm password is not match"
        }),

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

        phone:Joi.string().required(),
    }).options({presence:'required'},)
}

export const verifayEmailSchema={
    params:Joi.object({
        token:Joi.string().required()
    })
}


export const signInSchema={
    body:Joi.object({
        email:Joi.string()
        .required()
        .email({
            tlds:{
                allow:['com'],
                deny:['net','org']
            },
            maxDomainSegments:2,
            multiple:true,
            separator:'&'
        }),


        password:Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/)
        .messages({
            "string.pattern.base":"password must be contain 8 characters at least and contain uppercase and louercace "
        }),
    })
}



export const refreshtokenSchema = {
    headers: Joi.object({
        refreshtoken: Joi.string().required()
    }).unknown(true) 
};



export const signOutSchema={
    headers: Joi.object({
        refreshtoken: Joi.string().required(),
        accesstoken: Joi.string().required()

    }).unknown(true)
}

export const forgetpasswordSchema={
    body:Joi.object({
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
    })
}


export const resetpasswoedSchema={
    body:Joi.object({
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
        otp:Joi.required(),
        
        password:Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/)
        .messages({
            "string.pattern.base":"password must be contain 8 characters at least and contain uppercase and louercace "
        }),

        confirmPassword:Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            "any.only":"passwoed and confirm password is not match"
        }),
    })
}