var mongoose = require('mongoose')
var passwordHash = require('password-hash');


// mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    under_refer: {
        type: String,
        required: false,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    deviceToken: {
        type: String,
        required: false,
        default: null,
    },
    image: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        required: false,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    refer_code: {
        type: String,
        unique: true,
        required: false,
    },
    total_ref: {
        type: Number,
        required: false,
        default: 0
    },
    created_on: {
        type: Date
    },
    updated_on: {
        type: Date,
        require: false,
    },
    about: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    mobile: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: false,
    }

});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return passwordHash.verify(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);