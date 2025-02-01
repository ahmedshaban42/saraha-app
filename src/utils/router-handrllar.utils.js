import usercontroller from '../MODULES/user/user.controller.js'
import authcontroller from '../MODULES/Auth/auth.controller.js'
import messagecontroller from '../MODULES/messages/messages.controller.js'

import { globalhandelrMW } from '../Middleware/error-handdler.Middleware.js'

const routerhandellar=(app)=>{
    app.use('/auth',authcontroller)
    app.use('/user',usercontroller)
    app.use('/message',messagecontroller)



    app.use(globalhandelrMW)
}
export default routerhandellar