//mongoose model for user data
const mongoose = require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
    Email:{
        type: String,
        required:true
    },
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);

