import { Router } from "express";
const message=Router()
import {sendMessage,getmessages,getusermessages} from './services/messages.service.js'
import {errorHandler} from '../../Middleware/error-handdler.Middleware.js'

import {validationmiddleware}from '../../Middleware/validation-middleware.js'
import {sendMessageSchema}from '../../validators/message.shcema.js'
import {authenticationMiddleware,authorizationMiddleware} from '../../Middleware/authentication-middleware.js'




message.post ('/send-message',
    errorHandler(validationmiddleware(sendMessageSchema)),
    errorHandler(sendMessage))

message.get ('/get-message',
    errorHandler(getmessages))

message.get ('/get-user-message',
    errorHandler(authenticationMiddleware()),
    errorHandler(getusermessages))
export default message
