const dbUser = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;
const dbName = process.env.DB_NAME;

const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@devconnector.wws0c.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@devconnector.wws0c.mongodb.net/god?retryWrites=true&w=majority`;
module.exports = MONGODB_URI;