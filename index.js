const express = require('express');
const path = require('path');
const port = 8000;
const bodyParser = require('body-parser');
const db = require('./configs/mongoose');
const Contact = require('./models/contact');
const app = express(); // now this app has all the functionalities needed to run express

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middleware
// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('assets'));
//middleware1
// app.use(function (req, res, next) {
//     console.log('middleware1 called');
//     req.myName = "Rimjhim";
//     next();
// });

//middleware2
// app.use(function (req, res, next) {
//     console.log('middleware 2 called');
//     console.log("My name: ", req.myName);
//     next();
// });
var contactList = [
    {
        name: "Rudra",
        phone: "9875656231"
    },
    {
        name: "Izanami",
        phone: "9875859231"
    },
    {
        name: "Riya",
        phone: "9956323317"
    }
];
app.post('/create-contact', function (req, res) {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);  when not using mongodb

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) { console.log("Error in creating the contact"); };
        console.log('*********', newContact);
        return res.redirect('back');
    });
});

//this is more convenient than using switch cases
app.get('/', function (req, res) {
    // console.log("My name: ", req.myName);
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });
    });
    
});

//using params, :phone is to read the param
// app.get('/delete-contact/:phone', function (req, res) {     
//     console.log(req.params);
//     let phone =req.params.phone;
// });

//using query
app.get('/delete-contact/', function (req, res) {
    //get the id from query in the ul
    let id = req.query.id;
    console.log(id);
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting an object from the database");
            return;
        }
        return res.redirect('back');
    });
});
app.get('/practice', function (req, res) {
    return res.render('practice', { title: "Let us play with ejs" });
});
//listen to a request
app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
    }
    console.log('Express server is running!');
});