const mongoose= require('mongoose');

const contactSchema= new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Contact= mongoose.model('Contact', contactSchema);

module.exports= Contact;