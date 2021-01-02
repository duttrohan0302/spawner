const App = require('./../models/App')

exports.create = async function(givenApp){
    try{
        const newApp = await App.create(givenApp);

        // delete newApp['password']

        return newApp;

    }catch (e) {
        console.log(e)
        return e
    }
}

// Service to see if slug already exists
exports.findOne = async function(slug) {

    try{
        let app = await App.findOne({slug: slug})

        if(app){
            console.log("Service=> Slug already exists");
        }
        else{
            console.log("Service=>Slug doesn't exist")
        }
    
        return app
    }catch(e){
        return e;
    }
    
}