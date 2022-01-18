exports.mongooseIndex = () => {

    return(`
        const mongoose = require('mongoose');
        const URI = require('../config/index');
        
        // Connect to MongoDB
        mongoose
            .connect(URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            // .then(() => console.log("Mongoose Connected"))
            // .catch((err) => console.log(err));
        
        // When successfully connected
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected successfully');
        });
        
        // When connection throws an error
        mongoose.connection.on('error', err => {
            console.log('Mongoose Default Connection Error : ' + err);
        });
    `)
}
exports.baseTextMongoose = (modelName,schemaObject) => {
    schemaObject = JSON.parse(schemaObject)
    for (const [key,value] of Object.entries(schemaObject)) {
        if(!schemaObject[key].type){
             schemaObject[key].type="Schema.Types.ObjectId"
        }
    }
    schemaObject = JSON.stringify(schemaObject)
    schemaObject = schemaObject.replace(`"Schema.Types.ObjectId"`,'Schema.Types.ObjectId')
    return (`
        const mongoose = require("mongoose");
        mongoose.pluralize(null);
        const Schema = mongoose.Schema;

        const ${modelName + 'Schema'} = new Schema(${schemaObject});
        ${modelName + 'Schema'}.plugin(require('mongoose-autopopulate'))

        module.exports = Event = mongoose.model('${modelName}', ${modelName + 'Schema'});
    `)
}