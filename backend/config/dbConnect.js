const mongoose = require('mongoose');

dbConnect = async () => {

  await mongoose.connect(process.env.DB_CONNECTION_STRING).then(
    () => { console.log("Db Connected") }).catch(err => console.log(err));
}

module.exports = dbConnect;