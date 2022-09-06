var mongoose = require('mongoose')
var passwordHash = require('password-hash');


// mongoose.Promise = global.Promise;

const AdminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        required: false,
        unique: true,
    },
    image: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    created_on: {
        type: Date
    },
    address: {
        type: String,
        required: false,
    }
});

AdminSchema.methods.comparePassword = function (candidatePassword) {
    return passwordHash.verify(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);