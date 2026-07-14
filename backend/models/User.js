const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        minlength: 5,
        maxlength: 254,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
} );

const User = mongoose.model( 'User', userSchema );

module.exports = User;