// const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// console.log("passportLocalMongoose type:", typeof passportLocalMongoose);
// console.log("passportLocalMongoose keys:", Object.keys(passportLocalMongoose));
const pluginFunction = passportLocalMongoose.default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true, 
        unique: true    
    }
});

userSchema.plugin(pluginFunction);

// let passportLocalMongoose = require("passport-local-mongoose");
// // if the module was exported as { default: fn }
// if (passportLocalMongoose && passportLocalMongoose.default) {
//   passportLocalMongoose = passportLocalMongoose.default;
// }

// userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", userSchema);