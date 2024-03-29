// Import App Services
const AppService = require('./../services/app');
const TempAppService = require('./../services/tempApp');
const bcrypt = require("bcryptjs");
const mongooseApp = require('mongoose')
var AdmZip = require("adm-zip");
mongooseApp.pluralize(null);

const {returnAttribute} = require('./../middlewares/schemaMiddleware')

const { writeToFile } = require('./../scripts/writeToFile')

const { runFormat } = require('./../scripts/runFormat')
const { mainIndex } = require('./../scripts/mainIndex')
const { index : routesIndex,app : routesApp, controllers: controllersApp, services: servicesApp } = require('./../scripts/routesData')
const { middlewares : middlewareSetup,updateRoutesData, updateControllersData } = require('./../scripts/jwt')
const { baseTextMongoose, mongooseIndex } = require('./../scripts/mongooseModels');
const { configIndex,packageJSON,createEnv,createReadme,createGitIgnore } = require('../scripts/baseFiles');


function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}

const createZip = async (name) => {
    const downloadName = `${name}.zip`;
    const folderName = process.env.NODE_ENV==="production" ? "build" : "public"
    const zip = new AdmZip();
    zip.addLocalFolder(`${__dirname}/../apps/${name}/`)
    zip.writeZip(`${__dirname}/../client/${folderName}/zips/${downloadName}`)

    console.log("Zip done")
}

const appFolderBetter = async(app) => {

    const { appSchema } = app
    const appName = app.slug
    let modelNames = []
    let index=0;

    await writeToFile(`apps/${appName}/`,'package.json',packageJSON(appName,app.name,app.email))
    await writeToFile(`apps/${appName}/`,'.env',createEnv(appName))
    await writeToFile(`apps/${appName}/`,'.gitignore',createGitIgnore())
    await writeToFile(`apps/${appName}/`,'README.md',createReadme(appName,app.name,app.email,app))

    await writeToFile(`apps/${appName}/`,'index.js',mainIndex())

    await writeToFile(`apps/${appName}/config/`,'index.js',configIndex(appName))
    await writeToFile(`apps/${appName}/models/`,'index.js',mongooseIndex()) 

    while(index<appSchema.length){

        const model = appSchema[index]
        const { attributes,isAuth } = model;

        const schemaObj={}
        attributes.forEach((attribute,indexAttribute)=>{
            const newAttribute = returnAttribute(attribute)
            schemaObj[attribute.name] = newAttribute
        })
        modelNames.push(model.name)
        await writeToFile(`apps/${appName}/models/`,capitalize(model.name+'.js'),baseTextMongoose(model.name,JSON.stringify(schemaObj)))
        await writeToFile(`apps/${appName}/routes/`,model.name+'.js',routesApp(model.name))
        await writeToFile(`apps/${appName}/controllers/`,model.name+'.js',controllersApp(model.name))
        await writeToFile(`apps/${appName}/services/`,model.name+'.js',servicesApp(model.name))


        if(isAuth){
            await writeToFile(`apps/${appName}/middlewares/`,`passport${capitalize(model.name)}.js`,middlewareSetup(model.name))

            const routeData = await updateRoutesData(`apps/${appName}/routes/`,model.name)
            await writeToFile(`apps/${appName}/routes/`,model.name+'.js',routeData)

            const controllerData = await updateControllersData(`apps/${appName}/controllers/`,model.name)
            await writeToFile(`apps/${appName}/controllers/`,model.name+'.js',controllerData)

        }
        index++;

    }
    if(index==appSchema.length){
        await writeToFile(`apps/${appName}/routes/`,'index.js',routesIndex(modelNames))
        await runFormat()
        await createZip(appName)
        console.log("All files created and zip called")
    }
}
const createAppFolder = async (app) =>{

    try{
        const { appSchema } = app
        const appName = app.slug
        let modelNames = []

        appSchema.forEach((model,index)=> {
            const { attributes,isAuth } = model;
            const schemaObj={}
            attributes.forEach((attribute,indexAttribute)=>{
                const newAttribute = returnAttribute(attribute)
                schemaObj[attribute.name] = newAttribute
            })
            modelNames.push(model.name)
            async function writeF(){
                if(index===0){
                    await writeToFile(`apps/${appName}/`,'package.json',packageJSON(appName,app.name,app.email))
                    await writeToFile(`apps/${appName}/`,'.env',createEnv(appName))
                    await writeToFile(`apps/${appName}/`,'.gitignore',createGitIgnore())
                    await writeToFile(`apps/${appName}/`,'README.md',createReadme(appName,app.name,app.email,app))

                    await writeToFile(`apps/${appName}/`,'index.js',mainIndex())

                    await writeToFile(`apps/${appName}/config/`,'index.js',configIndex(appName))
                    await writeToFile(`apps/${appName}/models/`,'index.js',mongooseIndex())
                }else if(index===appSchema.length-1){
                    await writeToFile(`apps/${appName}/routes/`,'index.js',routesIndex(modelNames))
                }
                

                await writeToFile(`apps/${appName}/models/`,capitalize(model.name+'.js'),baseTextMongoose(model.name,JSON.stringify(schemaObj)))
                await writeToFile(`apps/${appName}/routes/`,model.name+'.js',routesApp(model.name))
                await writeToFile(`apps/${appName}/controllers/`,model.name+'.js',controllersApp(model.name))
                await writeToFile(`apps/${appName}/services/`,model.name+'.js',servicesApp(model.name))

                if(isAuth){
                    await writeToFile(`apps/${appName}/middlewares/`,`passport${capitalize(model.name)}.js`,middlewareSetup(model.name))

                    const routeData = await updateRoutesData(`apps/${appName}/routes/`,model.name)
                    await writeToFile(`apps/${appName}/routes/`,model.name+'.js',routeData)

                    const controllerData = await updateControllersData(`apps/${appName}/controllers/`,model.name)
                    await writeToFile(`apps/${appName}/controllers/`,model.name+'.js',controllerData)

                }
            };
            writeF()
            .then(async()=>{
                    await runFormat()
            }).then(async ()=>{
                if(index===appSchema.length-1){
                    setTimeout(()=>createZip(app.slug),2000)
                }
            }
            )
        })
        // await createZip(app.slug)

    }catch(err){
        console.log(err)
        return(err)
    }


}
exports.create = async function(req,res, next) {

    const errors = {}
    const newApp = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        slug: req.body.slug,
        appSchema: req.body.schema
    }

    try {
        const app = await AppService.findOne(newApp.slug)
        if(!app) {
            newApp.password = await hashPassword(newApp.password); 
            const createdApp = await AppService.create(newApp)
            // await createAppFolder(createdApp)
            await appFolderBetter(createdApp)

            return res.status(200).json(createdApp)
        }
        errors.slug = "Slug already exists, please change your slug";

        res.status(409).json(errors)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }

}

exports.get = async function(req,res,next){

    try{
        const model = req.params.model;
        const number = req.params.number || 10;
        const Model = req.models[model.charAt(0).toUpperCase()+model.slice(1)]

        if(number==="all" || number==="many"){
            const data = await TempAppService.findAll(Model)
            res.status(200).json(data)

        }else{
            const findBy = req.query.findBy;
            const value = req.query.value;

            const data = await TempAppService.findNum(Model,findBy,value,parseInt(number))
            res.status(200).json(data)

        }

    }catch(errors){
        console.log(errors)
        return res.status(400).json(errors);
    }
}

exports.post = async function(req,res,next){

    try{
        const model = req.params.model;
        const object = req.body.object;
        const Model = req.models[model.charAt(0).toUpperCase()+model.slice(1)]
        const data = await TempAppService.create(Model,object)
        return res.status(200).json(data)
    }catch(errors){
        console.log(errors)
        return res.status(400).json(errors);
    }
}

exports.patch = async function(req,res,next){

    try{
        const model = req.params.model;
        // const findBy = req.query.findBy;
        // const value = req.query.value;
        const object = req.body.object;
        const id = req.params.id;
        const Model = req.models[model.charAt(0).toUpperCase()+model.slice(1)]
        // const data = await TempAppService.update(Model,object,findBy,value)
        const data = await TempAppService.update(Model,object,id)

        return res.status(200).json(data)

    }catch(errors){
        return res.status(400).json(errors);
    }
}

exports.delete = async function(req,res,next){

    try{
        const model = req.params.model;
        const id = req.params.id;
        // const findBy = req.query.findBy;
        // const value = req.query.value;
        const Model = req.models[model.charAt(0).toUpperCase()+model.slice(1)]
        // const data = await TempAppService.delete(Model,findBy,value)
        const data = await TempAppService.delete(Model,id)

        return res.status(200).json(data)

    }catch(errors){
        return res.status(400).json(errors);
    }
}

//Function to hash Password
async function hashPassword (password) {
    
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}




