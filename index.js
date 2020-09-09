// ctrl + c to cancel the nodemon server

const express = require('express'); // server express
const port = 8000;
const path = require('path');
const app = express();

// including the mongoose database
const db = require('./config/mongoose');

// including the schema to the file 
const Contact = require('./models/contact');

// to use static files from assets folder
app.use(express.static('assets'));

// this help in req and 
app.use(express.urlencoded()); 

// tell the express about the template engine which we are using 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    // return res.render('home',{
    //     contact_list:contactList
    // });
    // if we want to send some title or something to this home ejs file
    // return res.render('home' , {title: "i am flying "}); like this
    Contact.find({}, function (err, contact) {
        if (err) {
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home', {
            title: "Contact List",
            contact_list: contact
        });

    })
});
app.get('/delete-contact/', function (req, res) {
    // let phone = req.query.phone;
    // console.log(phone);
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })   
});

app.post('/create-contact', function (req, res) {
    // contactList.push(req.body);
    // return res.redirect('back');
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('Error in creating a contact!')
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    })
});


app.listen(port, function (err) {
    if (err) {
        console.log('error in runntin the server', err);
    }
    console.log('express server is running on port: ', port);
});