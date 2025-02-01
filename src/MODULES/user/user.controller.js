import{getuserdata,updatepassword,updateProfile} from './services/user.service.js'
import {authenticationMiddleware,authorizationMiddleware} from '../../Middleware/authentication-middleware.js'
import { systemrRoles } from '../../constants/constants.js';
import { Router } from "express";
import { errorHandler } from '../../Middleware/error-handdler.Middleware.js';

const user =Router();

const {Admin,User,superAdmin}=systemrRoles

user.get('/getuserbyemail',errorHandler(authenticationMiddleware()),errorHandler(authorizationMiddleware([Admin,User])),errorHandler(getuserdata))
user.patch('/update-password',authenticationMiddleware(),authorizationMiddleware([User]),updatepassword)
user.put('/update-profile',authenticationMiddleware(),authorizationMiddleware([User]),updateProfile)

export default user