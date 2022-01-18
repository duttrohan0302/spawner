exports.configIndex = (db) => {
    const str = `const dbUser = process.env.MONGO_USERNAME;
    const dbPassword = process.env.MONGO_PASSWORD;
    const dbName = ${db ? `'${db}'` : 'process.env.DB_NAME'}  ;

    const MONGODB_URI = \`mongodb+srv://\${dbUser}:\${dbPassword}@devconnector.wws0c.mongodb.net/\${dbName}?retryWrites=true&w=majority\`;
    module.exports = MONGODB_URI;
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
          "mongoose": "",
          "mongoose-autopopulate": "",
          "nodemon": ""
        }
      }`

      return str;
      
}

exports.createEnv = (db) => {

  return(
`MONGO_USERNAME=
MONGO_PASSWORD=
DB_NAME=${db}
NODE_ENV=development`
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

exports.createReadme = (appName,author,email) =>{
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
</pre>

### Installing the dependencies
<pre>
  npm install
</pre>

### Running the server
<pre>
  npm run dev
</pre>
`    
  )
}
