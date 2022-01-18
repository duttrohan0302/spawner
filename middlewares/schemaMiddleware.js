const mongooseApp = require('mongoose')
const AppService = require('./../services/app');
const dbUser = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;


mongooseApp.pluralize(null);

exports.returnAttribute = returnAttribute = (attribute) =>{

    let attri;
    let myType;
    if(attribute.type==="Array"){
        if(attribute.ref && attribute.ref!==""){
            myType = mongooseApp.Schema.Types.ObjectId
            attri = []
            attri.push({
                type: myType,
                required: attribute.required,
                ref: attribute.ref,
                autopopulate:true
            })
        }
        else{
            myType='String'
            attri = [{
                type: myType,
                required: attribute.required,
            }]
        }
    }
    else{
        if(attribute.type==="ObjectId"){
            myType=mongooseApp.Schema.Types.ObjectId
            attri = {
                type:myType,
                required: attribute.required,
                ref: attribute.ref,
                autopopulate : true
            }
        }
        else{
            myType=attribute.type
            attri={
                type:myType,
                required: attribute.required
            }
        }

    }
    
    return attri;
}
exports.schemaMiddleware = async function(req,res,next) {

    const appName = req.params.appSlug
    const app = await AppService.findOne(appName)
    const { appSchema } = app


    let mongoose2;
    if(appName && appName!=='') {
        const appUrl = `mongodb+srv://${dbUser}:${dbPassword}@devconnector.wws0c.mongodb.net/${appName}?retryWrites=true&w=majority`

        // Connect to MongoDB
        mongoose2 = mongooseApp.createConnection(appUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
    }




    req.appSchema = appSchema;

    try{
        req.models = {}
        let modelNames = []
        // Make models using the schema data
        appSchema.forEach((model,index)=> {
            const { attributes } = model;
            const schemaObj={}
            attributes.forEach((attribute,indexAttribute)=>{
                const newAttribute = returnAttribute(attribute)
                schemaObj[attribute.name] = newAttribute
            })
            const TempSchema = new mongooseApp.Schema(schemaObj)
            TempSchema.plugin(require('mongoose-autopopulate'))
            req.models[model.name.charAt(0).toUpperCase()+model.name.slice(1)] = mongoose2.model(model.name,TempSchema)
            modelNames.push(model.name)
        })

 
    }catch(error){
        console.log(error)
    }

    next()
    
}
