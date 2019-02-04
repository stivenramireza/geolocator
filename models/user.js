const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    displayName: String,
    username: {type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, select: false },
})


UserSchema.pre('save', function (next) {
    let user = this
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
    });
})

module.exports = mongoose.model('User', UserSchema)
