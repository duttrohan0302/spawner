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

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
// 	// Set Static folder
// 	app.use(express.static("client/build"));
  
// 	app.get("*", (req, res) => {
// 	  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// 	});
// }

// function listRoutes(routes, stack, parent){

// 	parent = parent || '';
// 	if(stack){
// 	  stack.forEach(function(r){
// 		if (r.route && r.route.path){
// 		  var method = '';
  
// 		  for(method in r.route.methods){
// 			if(r.route.methods[method]){
// 			  routes.push({method: method.toUpperCase(), path: parent + r.route.path});
// 			}
// 		  }       
  
// 		} else if (r.handle && r.handle.name == 'router') {
// 		  console.log(r.regexp.source)
// 		  const routerName = r.regexp.source.replace("^\\","").replace("\\/?(?=\\/|$)","");
// 		  return listRoutes(routes, r.handle.stack, parent + routerName);
// 		}
// 	  });
// 	  return routes;
// 	} else {
// 	  return listRoutes([], app._router.stack);
// 	}
//   }
  
//   //Usage on app.js
//   const rr = listRoutes(); 
//   console.log(rr)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});