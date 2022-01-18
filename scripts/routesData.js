exports.index = (modelNames) => {
  return `const router = require('express').Router();
    const path = require('path')

    ${
        modelNames.map(model=>`
            const ${model} = require('./${model}');
        `).join('')
    }
    ${
        modelNames.map(model=>`
            router.use('/',${model});
        `).join('')
    }

    module.exports = router;`;
};

function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}

exports.app = (routeName) => {

    const controller = capitalize(routeName)+"Controller"
    return(`const router = require('express').Router();

    //Import controller
    const ${controller} = require('../controllers/${routeName}')

    router.get('/${routeName}/:number', ${controller}.get)

    router.post('/${routeName}', ${controller}.post)

    router.patch('/${routeName}/:id', ${controller}.patch)

    router.delete('/${routeName}/:id', ${controller}.delete)

    module.exports = router;
    `)
}

exports.controllers = (controllerName) => {

    const servicer = capitalize(controllerName)+"Service"

    return(
        `
        // Import Services
        const ${servicer} = require('./../services/${controllerName}');   
        
        exports.get = async function(req,res,next){

            try{
                const number = req.params.number || 10;
                const findBy = req.query.findBy;
                const value = req.query.value;
                if(number==="all" || number==="many"){
                    const data = await ${servicer}.findAll()
                    res.status(200).json(data)
        
                }else{

                    const data = await ${servicer}.findNum(findBy,value,parseInt(number))
                    res.status(200).json(data)
        
                }
        
            }catch(errors){
                return res.status(400).json(errors);
            }
        }

        exports.post = async function(req,res,next){

            try{
                const object = req.body;
                const data = await ${servicer}.post(object)
                return res.status(200).json(data)
            }catch(errors){
                return res.status(400).json(errors);
            }
        }

        exports.delete = async function(req,res,next){

            try{
                const id = req.params.id;
                const data = await ${servicer}.delete(id)
        
                return res.status(200).json(data)
        
            }catch(errors){
                return res.status(400).json(errors);
            }
        }

        exports.patch = async function(req,res,next){

            try{
                const id = req.params.id;
                const object = req.body;
                const data = await ${servicer}.patch(id,object)
        
                return res.status(200).json(data)
        
            }catch(errors){
                return res.status(400).json(errors);
            }
        }
        
        `
    )
}


exports.services = (modelName) => {

    modelName = capitalize(modelName)

    return (`
    //Import Model
    const ${modelName} = require('./../models/${modelName}')

    
    exports.findAll = async function () {
        try {
            const data = await ${modelName}.find({});

            return data;
        } catch (e) {
            return e;
        }
    }

    exports.findNum = async function (findBy, value, num) {

        try {
            const obj = {}
            obj[findBy] = value
            const data = await ${modelName}.find(obj).limit(num)
    
            return data;
    
        } catch (e) {
            return e;
        }
    
    }

    
    exports.post = async function (object) {
        try {
            const data = await ${modelName}.create(object)
            return data;

        } catch (e) {
            return e;
        }
    }

    exports.patch = async function (id, object) {
        try {
            const data = await ${modelName}.findByIdAndUpdate(id, object, { new: true, omitUndefined: true })
            return data;
    
        } catch (e) {
            return e;
        }
    }

    exports.delete = async function (id) {
        try {
            const data = await ${modelName}.findByIdAndDelete(id)
            return data;
    
        } catch (e) {
            return e;
        }
    }

    `)
}

