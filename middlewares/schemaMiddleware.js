const mongooseApp = require('mongoose')
const AppService = require('./../services/app');
const dbUser = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;
const dbName = process.env.DB_NAME;
// const { writeToFile } = require('./../scripts/writeToFile')

// const { runFormat } = require('./../scripts/runFormat')
// const { mainIndex } = require('./../scripts/mainIndex')
// const { index : routesIndex,app : routesApp, controllers: controllersApp, services: servicesApp } = require('./../scripts/routesData')
// const { baseTextMongoose, mongooseIndex } = require('./../scripts/mongooseModels');
// const { configIndex,packageJSON,createEnv,createReadme,createGitIgnore } = require('../scripts/baseFiles');


// mongooseApp.set('debug',true)
mongooseApp.pluralize(null);

// function capitalize(s){
//     return s[0].toUpperCase() + s.slice(1);
// }

exports.returnAttribute = returnAttribute = (attribute) =>{

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
        // .then(() => console.log(`Mongoose Connected with ${appName}`))
        // .catch((err) => console.log(err));
    }




    req.appSchema = appSchema;

    try{
        req.models = {}
        let modelNames = []
        // Make models using the schema data
        appSchema.forEach((model,index)=> {
            // name.charAt(0).toUpperCase()+name.slice(1)
            const { attributes } = model;
            const schemaObj={}
            attributes.forEach((attribute,indexAttribute)=>{
                const newAttribute = returnAttribute(attribute)
                schemaObj[attribute.name] = newAttribute
            })
            const TempSchema = new mongooseApp.Schema(schemaObj)
            TempSchema.plugin(require('mongoose-autopopulate'))
            // req[model.name.charAt(0).toUpperCase()+model.name.slice(1)+"Schema"] = new mongooseApp.Schema(schemaObj)
            // req[model.name.charAt(0).toUpperCase()+model.name.slice(1)+"Schema"].plugin(require('mongoose-autopopulate'))
            req.models[model.name.charAt(0).toUpperCase()+model.name.slice(1)] = mongoose2.model(model.name,TempSchema)
            modelNames.push(model.name)
            // async function writeF(){
            //     if(index===0){
            //         await writeToFile(`apps/${appName}/`,'package.json',packageJSON(appName,app.name,app.email))
            //         await writeToFile(`apps/${appName}/`,'.env',createEnv(appName))
            //         await writeToFile(`apps/${appName}/`,'.gitignore',createGitIgnore())
            //         await writeToFile(`apps/${appName}/`,'README.md',createReadme(appName,app.name,app.email))

            //         await writeToFile(`apps/${appName}/`,'index.js',mainIndex())

            //         await writeToFile(`apps/${appName}/config/`,'index.js',configIndex(appName))
            //         await writeToFile(`apps/${appName}/models/`,'index.js',mongooseIndex())
            //     }else if(index===appSchema.length-1){
            //         await writeToFile(`apps/${appName}/routes/`,'index.js',routesIndex(modelNames))
            //     }
                

            //     await writeToFile(`apps/${appName}/models/`,capitalize(model.name+'.js'),baseTextMongoose(model.name,JSON.stringify(schemaObj)))
            //     await writeToFile(`apps/${appName}/routes/`,model.name+'.js',routesApp(model.name))
            //     await writeToFile(`apps/${appName}/controllers/`,model.name+'.js',controllersApp(model.name))
            //     await writeToFile(`apps/${appName}/services/`,model.name+'.js',servicesApp(model.name))

            //     await runFormat()
            // };
            // writeF()
        })

 
    }catch(error){
        console.log(error)
    }

    next()
    
}
