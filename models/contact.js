const mongoose = require('mongoose');


// creating schema of data
const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    }
);

// creating collection (Contact is a collection which use contactSchema)
const Contact = mongoose.model('Contact', contactSchema);

// export it to make it available for library inclusion
module.exports = Contact;