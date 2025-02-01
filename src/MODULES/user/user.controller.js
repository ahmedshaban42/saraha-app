import{getuserdata,updatepassword,updateProfile} from './services/user.service.js'
import {authenticationMiddleware,authorizationMiddleware} from '../../Middleware/authentication-middleware.js'
import { systemrRoles } from '../../constants/constants.js';
import { Router } from "express";
import { errorHandler } from '../../Middleware/error-handdler.Middleware.js';
import {validationmiddleware}from '../../Middleware/validation-middleware.js'
import {updatepasswordSchema,updateProfileSchema}from '../../validators/user.schema.js'

const user =Router();

const {Admin,User,superAdmin}=systemrRoles

user.get('/getuserbyemail',errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware([Admin,User])),
    errorHandler(getuserdata))




user.patch('/update-password',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware([User])),
    validationmiddleware(updatepasswordSchema),
    errorHandler(updatepassword))




user.put('/update-profile',
    errorHandler(authenticationMiddleware()),
    errorHandler(authorizationMiddleware([User])),
    validationmiddleware(updateProfileSchema),
    errorHandler(updateProfile))

export default user