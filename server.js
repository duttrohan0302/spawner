const express = require('express');
require('dotenv').config()
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// connect to db
require('./models');

// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const routes = require('./routes');


app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});