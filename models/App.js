const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },  
  // One of the schema's can have an auth functionality, i.e. Passport JWT auth and password encryption
  appSchema:
    [
      {
        name: {
          type: String,
          required: true
        },
        isAuth: {
          type: Boolean,
          required: false,
          default: false
        },
        attributes: [
          {
            name: {
              type: String,
              required: true
            },
            type: {
              type: String,
              required: true,
              enum: ['String','Number','Date','Buffer','Boolean','Mixed','ObjectId','Array']
            },
            ref:{
              type: String,
              required: false,
            },
            required: {
              type: Boolean,
              default: false
            }
          }
        ]
      }
    ],
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = App = mongoose.model("app", AppSchema);
