const express = require('express');
require('dotenv').config()
const app = express();
const path = require('path')

const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// connect to db
require('./models');

// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

if (process.env.NODE_ENV === "production") {
	// Set Static folder
	app.use(express.static(path.resolve(__dirname, "client", "build")));
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
	// const root = require("path").join(__dirname, "./build");
	// app.use(express.static(root));
	// app.get("*", (req, res) => {
	//   res.sendFile("index.html", { root });
	// });
}

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});