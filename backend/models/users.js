let mongoose = require('mongoose')

let usersSchema = mongoose.Schema({
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
    role:{
        type : String,
        required : true,
        default : "standard"
    }
})

module.exports = mongoose.model('users',usersSchema)