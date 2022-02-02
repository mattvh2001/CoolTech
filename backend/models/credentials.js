let mongoose = require('mongoose')

let credentialSchema = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    organisational_units:{
        type : Array,
        required : true
    },
    divisions:{
        type : Array,
        required : true
    },
    service:{
        type : String,
        required : true,
    },  
})

let Jobs = module.exports = mongoose.model('credentials',credentialSchema)