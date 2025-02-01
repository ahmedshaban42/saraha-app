import { Router } from 'express'
import {signUpService,signInServise,verifayEmail,refreshtoken,signOutServise,forgetpassword,resetpasswoed}from './Services/authentication.service.js'
import {validationmiddleware}from '../../Middleware/validation-middleware.js'
import { signUpSchema } from '../../validators/auth.schema.js'
const authcontroller =Router()


authcontroller.post('/signup',validationmiddleware(signUpSchema),signUpService)
authcontroller.get('/verify/:token',verifayEmail)
authcontroller.post('/signin',signInServise)
authcontroller.get('/refreshtoken',refreshtoken)
authcontroller.post('/logout',signOutServise)
authcontroller.patch('/forgetpassword',forgetpassword)
authcontroller.patch('/resetpassword',resetpasswoed)
export default authcontroller