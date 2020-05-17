// import library
const mongoose = require('mongoose');

// connect to base
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection
const db = mongoose.connection;

// turning on database
// if error
db.on('error', console.error.bind(console, 'error connecting to database'));

// up and running
db.once('open', function(){
    console.log('Succesfully connected to database');
});