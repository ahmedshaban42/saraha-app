import { Router } from 'express'

import {signUpService,signInServise,verifayEmail,refreshtoken,signOutServise,forgetpassword,resetpasswoed}from './Services/authentication.service.js'

import {validationmiddleware}from '../../Middleware/validation-middleware.js'

import {errorHandler} from '../../Middleware/error-handdler.Middleware.js'

import { signUpSchema,verifayEmailSchema,signInSchema,refreshtokenSchema,signOutSchema,forgetpasswordSchema,resetpasswoedSchema } from '../../validators/auth.schema.js'

const authcontroller =Router()


authcontroller.post('/signup',
    errorHandler(validationmiddleware(signUpSchema)),
    errorHandler(signUpService))

authcontroller.get('/verify/:token',
    errorHandler(validationmiddleware(verifayEmailSchema)),
    errorHandler(verifayEmail))

authcontroller.post('/signin',
    errorHandler(validationmiddleware(signInSchema)),
    errorHandler(signInServise))

authcontroller.get('/refreshtoken',
    errorHandler(validationmiddleware(refreshtokenSchema)),
    errorHandler(refreshtoken))

authcontroller.post('/logout',
    errorHandler(validationmiddleware(signOutSchema)),
    errorHandler(signOutServise))

authcontroller.patch('/forgetpassword',
    errorHandler(validationmiddleware(forgetpasswordSchema)),
    errorHandler(forgetpassword))

authcontroller.patch('/resetpassword',
    errorHandler(validationmiddleware(resetpasswoedSchema)),
    errorHandler(resetpasswoed))
export default authcontroller