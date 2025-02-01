

export const validationmiddleware=(Schema)=>{
    return (req,res,next)=>{
        const schemakeys=Object.keys(Schema)


        let validationError=[]


        for(const key of schemakeys){
            const {error}=Schema[key].validate(req[key],{abortEarly:false})
            if(error){
                validationError.push(...error.details)
                //validationError.push(error.message)
            }
        }

        if(validationError.length){
            return res.status(400).json({message:'validate error',error:validationError})
        }
        next()

    }
} 
