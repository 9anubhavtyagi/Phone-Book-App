const express = require('express');
const path = require('path');
const port = 8000;

// including our mongoose.js (config library)
const db = require('./config/mongoose');

// including the Collection(Schema)
const Contact = require('./models/contact');

const app = express(); // starting the express app


// telling which type of view engine is used
app.set('view engine', 'ejs');

//access to views folder, so that ejs templates can be used
app.set('views', path.join(__dirname, 'views'));


// middleware

// it is a parser and read only form data not params.
app.use(express.urlencoded()); // it is a parser...

// access to assests folder, so that css and js can be implemented on rendered html.
app.use(express.static('assets'));


// routers


// this router is to fetch contacts and display them on screen.
app.get('/', function(req,res){
    Contact.find(
        // first we pass a query
        // here we pass empty query because we want all contact,
        // for specific data we code query accordingly.
        {},
        function(err, contacts){
            if(err){
                console.log('Error in fetching contacts from db');
                return;
            }

            return res.render('home',
            {
                title: "My Contact List",
                contact_list: contacts
            });
        }
    );
});

app.post('/create-contact', function(req, res){
    Contact.create(req.body, function(err, newContact){
        if(err){
            console.log('Error in creating a contact');
            return;
        }
        
        return res.redirect('back');
        }
    );
});


// router for deleting a contact
// using query param
app.get('/delete-contact', function(req, res){

    //get the id from query in the url and then delete the corresponding data
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    });
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running server', err);
        return;
    }
    // console.log('Server runs');
});