//require the library
const mongoose = require('mongoose'); 
//connected mongoose to the database
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/contact_list_db');
//db will acquire the connection, from which we can access the databasse
const db = mongoose.connection; 
//to check error 
db.on('error', console.error.bind(console, 'error connecting to db'));
//working and running, then print
db.once('open', function(){
    console.log('Successfully connected');
});