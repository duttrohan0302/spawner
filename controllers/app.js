// Import App Services
const AppService = require('./../services/app');
const TempAppService = require('./../services/tempApp');
const bcrypt = require("bcryptjs");
const mongooseApp = require('mongoose')
mongooseApp.set('debug',true)
mongooseApp.pluralize(null);

mongooseApp.set('debug',true)
mongooseApp.pluralize(null);

exports.create = async function(req,res, next) {

    // const { errors, isValid } = validateRegisterInput(req.body)
    // if(!isValid) {
        // return res.status(400).json(errors);
    // }
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
            return res.status(200).json(createdApp)
        }
        errors.slug = "Slug already exists, please change your slug";

        res.status(409).json(errors)
    } catch (err) {
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

            const data = await TempAppService.findOne(Model,findBy,value)
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
        console.log(object)
        const data = await TempAppService.create(Model,object)
        console.log(data)
        // const newClass = await req.models.Class.create({name:"Class T"})
        // const student1 = await req.models.Student.create({name:"ST1",email:"st1@gmail.com",password:"12345678",phone:"9876543210",class:newClass._id});

        // const student2 = await req.models.Student.create({name:"ST2",email:"st2@gmail.com",password:"12345678",phone:"9876543210",class:newClass._id});
        // const student3 = await req.models.Student.create({name:"ST3",email:"st3@gmail.com",password:"12345678",phone:"9876543210",class:newClass._id});
        // const student4 = await req.models.Student.create({name:"ST4",email:"st4@gmail.com",password:"12345678",phone:"9876543210",class:newClass._id});
        // const student5 = await req.models.Student.create({name:"ST5",email:"st5@gmail.com",password:"12345678",phone:"9876543210",class:newClass._id});
        // const teacher = await req.models.Teacher.create({name:"Teacher 1",class:newClass._id,student:[student1._id,student2._id,student3._id,student4._id,student5._id]})
        // return res.status(200).json(teacher)
        return res.status(200).json(data)
    }catch(errors){
        console.log(errors)
        return res.status(400).json(errors);
    }
}

exports.patch = async function(req,res,next){

    try{
        const model = req.params.model;
        const findBy = req.query.findBy;
        const value = req.query.value;
        const object = req.body.object;
        const Model = req.models[model.charAt(0).toUpperCase()+model.slice(1)]
        const data = await TempAppService.update(Model,object,findBy,value)

        return res.status(200).json(data)

    }catch(errors){
        return res.status(400).json(errors);
    }
}

exports.delete = async function(req,res,next){

    try{
        const model = req.params.model;
        const findBy = req.query.findBy;
        const value = req.query.value;
        const Model = req.models[model.charAt(0).toUpperCase()+model.slice(1)]
        const data = await TempAppService.delete(Model,findBy,value)

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




