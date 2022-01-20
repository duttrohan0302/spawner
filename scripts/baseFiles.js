function capitalize(s){
  return s[0].toUpperCase() + s.slice(1);
}

exports.configIndex = (db) => {
    const str = `const dbUser = process.env.MONGO_USERNAME;
    const dbPassword = process.env.MONGO_PASSWORD;
    const dbName = ${db ? `'${db}'` : 'process.env.DB_NAME'}  ;
    const secretOrKey = process.env.SECRETORKEY || '123456'
    const MONGODB_URI = \`mongodb+srv://\${dbUser}:\${dbPassword}@devconnector.wws0c.mongodb.net/\${dbName}?retryWrites=true&w=majority\`;
    module.exports = 
    {
      URI:MONGODB_URI,
      secretOrKey
    }
    `

    return str
}

exports.packageJSON = (appName,author,email) => {


    const str = 
    `{
        "name": "${appName}",
        "version": "1.0.0",
        "description": "CRUD app for ${appName}",
        "main": "index.js",
        "scripts": {
          "start": "node index.js",
          "dev": "nodemon index.js"
        },
        "keywords": [
          "${appName}"
        ],
        "author": "${author} <${email}>",
        "license": "ISC",
        "dependencies": {
          "bcryptjs": "",
          "body-parser": "",
          "cors": "",
          "dotenv": "",
          "express": "",
          "jsonwebtoken": "",
          "mongoose": "",
          "mongoose-autopopulate": "",
          "nodemon": "",
          "passport": "",
          "passport-jwt": ""
        }
      }`

      return str;
      
}

exports.createEnv = (db) => {

  return(
`MONGO_USERNAME=
MONGO_PASSWORD=
DB_NAME=${db}
NODE_ENV=development
SECRETORKEY=
PORT=5001`
  )
}

exports.createGitIgnore = () => {

  return(
`# NodeJS specific #
.nyc_output/
coverage/
node_modules/
.env
npm-debug.log
package-lock.json
test/*.log
`
  )
}

exports.createReadme = (appName,author,email,app) =>{
  return(
`# The ${appName} backend app
## Complete with all CRUD functionalities, created by ${author}(${email})

### Techstack
- NodeJS
- Express
- MongoDB & Mongoose

### Config
Create a .env file and add the following values
<pre>
  MONGO_USERNAME=
  MONGO_PASSWORD=
  DB_NAME=${appName}
  NODE_ENV=development
  SECRETORKEY=
</pre>

### Installing the dependencies
<pre>
  npm install
</pre>

### Running the server
<pre>
  npm run dev
</pre>

## Routes

${app.appSchema.map(model=>
  `### ${capitalize(model.name)} Routes

  1. Create ${model.name} route
  <pre>
    @type POST
    @route /${model.name}
    @desc Create a ${model.name}
    @access Public
    @Fields Required -${model.attributes.map(attri=>` ${attri.name}`).join(",")} in body
  </pre>

  2. Get ${model.name} route
  <pre>
    @type GET
    @route /${model.name}/all or /${model.name}/?findBy=var1&value=var2
    @desc Get ${model.name}s
    @access Public
    @Fields Required - var1 can be ${model.attributes.map(attri=>` ${attri.name}`).join(",")} and var2 is the value
  </pre>

  3. Update ${model.name} route
  <pre>
    @type PATCH
    @route /${model.name}/:id
    @desc Update a particular ${model.name}
    @access Public
    @Fields Required - id in url path params and send details to be updated in body
  </pre>

  4. Delete ${model.name} route
  <pre>
    @type DELETE
    @route /${model.name}/:id
    @desc Delete a particular ${model.name}
    @access Public
    @Fields Required - id in url path params
  </pre>

  ${model.isAuth ? 
  `5. Login/Authenticate ${model.name} route
  <pre>
    @type POST
    @route /${model.name}/authenticate
    @desc Authenticate a particular ${model.name}
    @access Private
    @Fields Required - email and password in body
  </pre>

  6. Get current ${model.name} route
  <pre>
    @type GET
    @route /${model.name}/current
    @desc Get current ${model.name} details
    @access Private
    @Fields Required - Send Bearer token in Authorization Header
  </pre>
  ` : ""}
  `
  
).join("")}

`    
  )
}
