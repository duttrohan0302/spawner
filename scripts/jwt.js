const fse = require('fs-extra');


function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}

exports.middlewares = (modelName) => {
    return(
    `
    const JwtStrategy = require("passport-jwt").Strategy;
    const ExtractJwt = require("passport-jwt").ExtractJwt;
    const mongoose = require("mongoose");
    const ${capitalize(modelName)} = mongoose.model("${modelName}");
    const { secretOrKey } = require("./../config");

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secretOrKey;

    module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
        ${capitalize(modelName)}.findById(jwt_payload.id)
            .then((${modelName}) => {
            if (${modelName}) {
                console.log("${modelName} found")
                return done(null, ${modelName});
            }
            console.log("${modelName} not found")
            return done(null, false);
            })
            .catch((err) => console.log(err));
        })
    );
    };
    `)
}

exports.updateRoutesData = async (dir,modelName) => {
    try{
        let data = await fse.readFileSync(`${dir}/${modelName}.js`,"utf-8").toString().split('\n')

        const extraLines = `
    //Import and require Passport
    const passport = require("passport");
    require("./../middlewares/passport${capitalize(modelName)}")(passport);

    //Login route
    router.post('/${modelName}/login',${capitalize(modelName)}Controller.login);

    // Get the current ${modelName} detail
    // To check the ${modelName} auth
    router.get('/${modelName}/current', passport.authenticate("jwt",{session:false}), ${capitalize(modelName)}Controller.getCurrent)`
    
        data.splice(4,0,extraLines)
        data = data.join('\n')

        return data
    }catch(err){
        console.log("ERR is ",err)
    }
}

exports.updateControllersData = async (dir,modelName) => {
    try{
        let data = await fse.readFileSync(`${dir}/${modelName}.js`,"utf-8").toString().split('\n')

        const encryptPassLines=`object.password = await hashPassword(object.password); `
        data.splice(30,0,encryptPassLines)
        data.splice(32,0,`data.password=undefined`)
        const includePackages = `
        // Import bcryptjs and JsonWebToken
        const bcrypt = require("bcryptjs");
        const jwt = require("jsonwebtoken");
        const { secretOrKey } = require('../config')`
        data.splice(0,0,includePackages)
        data = data.join('\n')

        const extraLines = `
        
        //Login controller
        exports.login = async function(req, res, next) {
            const errors = {}
            const { email, password } = req.body;
            try {
                const ${modelName}Arr = await ${capitalize(modelName)}Service.findNum('email',email,1);
                const ${modelName} = ${modelName}Arr[0]
                if(!${modelName}) {
                    errors.${modelName}name= "${capitalize(modelName)} not found";
                    return res.status(404).json(errors)
                }
        
                // Check password
                const isSame = await compare(password, ${modelName}.password);
                
                if(isSame){
                    ${modelName}.password=undefined
                    const payloadObj = {...${modelName}._doc,id:${modelName}._id.toString(),_id:${modelName}._id.toString()}
                    // Password matched, create payload
                    const payload = payloadObj //Create JWT Payload
                    // Sign token
                    jwt.sign(
                        payload,
                        secretOrKey,
                        { expiresIn: 86400 },
                        (err, token) => {
                            if(err){
                                return res.status(400).json({errors:err})
                            }else{
                                return res.status(200).json({
                                    success: true,
                                    token: "Bearer " + token,
                                    ${modelName}: payloadObj
                                });
                            }
                        
                        }
                    );
                } else {
                    errors.password = "Password Incorrect";
                    return res.status(401).json(errors);
                }
            } catch (errors) {
                res.status(400).json(errors);
            }
        }
        
        // Get the current ${modelName} details controller
exports.getCurrent = function(req,res,next) {
    try{
        return res.status(200).json({${modelName}:req.${modelName}})
    } catch (errors) {
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

//Compare password
async function compare (password1, password2) {

    const isSame = await new Promise((resolve, reject) => {
        bcrypt.compare(password1, password2, function(err, result) {
            if(err) reject(err)
            resolve(result)
        })
    })

    return isSame;
}`

        // data.splice(4,0,extraLines)
        // data = data.join('\n')
        data += '\n'+extraLines
        return data
    }catch(err){
        console.log("ERR is ",err)
    }
}