const mongooseApp = require('mongoose')
const AppService = require('./../services/app');
const dbUser = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;
const dbName = process.env.DB_NAME;

mongooseApp.set('debug',true)
mongooseApp.pluralize(null);

exports.schemaMiddleware = async function(req,res,next) {


    const app = await AppService.findOne(req.params.appSlug)
    const { appSchema } = app


    let mongoose2;
    if(req.params.appSlug && req.params.appSlug!=='') {
        const appUrl = `mongodb+srv://${dbUser}:${dbPassword}@devconnector.wws0c.mongodb.net/${req.params.appSlug}?retryWrites=true&w=majority`

        // Connect to MongoDB
        mongoose2 = mongooseApp.createConnection(appUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        // .then(() => console.log(`Mongoose Connected with ${req.params.appSlug}`))
        // .catch((err) => console.log(err));
    }


    const returnAttribute = (attribute) =>{

        // {
        //     type: returnAttribute(attribute),
        //     required: attribute.required,
        // }
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

    req.appSchema = appSchema;

    try{
        req.models = {}
        // Make models using the schema data
        appSchema.forEach((model,index)=> {
            // name.charAt(0).toUpperCase()+name.slice(1)
            const { attributes } = model;
            const schemaObj={}
            attributes.forEach((attribute,indexAttribute)=>{
                const newAttribute = returnAttribute(attribute)
                schemaObj[attribute.name] = newAttribute
            })
            // console.log(schemaObj)
            const TempSchema = new mongooseApp.Schema(schemaObj)
            TempSchema.plugin(require('mongoose-autopopulate'))
            // req[model.name.charAt(0).toUpperCase()+model.name.slice(1)+"Schema"] = new mongooseApp.Schema(schemaObj)
            // req[model.name.charAt(0).toUpperCase()+model.name.slice(1)+"Schema"].plugin(require('mongoose-autopopulate'))
            req.models[model.name.charAt(0).toUpperCase()+model.name.slice(1)] = mongoose2.model(model.name,TempSchema)
            if(index===appSchema.length-1){
                console.log(req.models)
            }
            // req.models[model.name.charAt(0).toUpperCase()+model.name.slice(1)] = mongoose2.model(model.name,req[model.name.charAt(0).toUpperCase()+model.name.slice(1)+"Schema"],model.name)
            // console.log("=>",model.name,"=> ",TempSchema)
        })

 
    }catch(error){
        console.log(error)
    }



    next()
    
}
