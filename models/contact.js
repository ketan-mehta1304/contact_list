// Model represents the structure of data,
// the format and the constraints with which it is stored
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }

})

                           //  ||||||| this contact is which make a sheet of name contact in data base
const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;