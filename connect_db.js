const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

// make a connection
const connect_db = () => {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("We're connected!")
        }
    );
}

module.exports = connect_db;