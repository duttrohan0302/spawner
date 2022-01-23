exports.mainIndex = () => {

    return(`
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const path = require('path')
    const cors = require('cors')
    require('dotenv').config()

    const routes = require('./routes');


    // connect to db
    require('./models');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    
    // Use Routes   
    app.use(routes)



    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(\`Server listening on port \${PORT}.\`);
    });    
    
    `)
}