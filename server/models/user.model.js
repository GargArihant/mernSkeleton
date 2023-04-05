import mongoose from "mongoose";
var crypto = require('crypto');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
       },
       created: {
        type: Date,
        default: Date.now
       },
       updated: Date,
       hashed_password: {
        type: String,
        required: "Password required"
       },
       salt: String       
    
              
})

 UserSchema.methods = {
    authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
    if (!password) return 'no'
    try {
    
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')

    } catch (err) {
       return 'al'
    }
    },
    makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
    }
   }
   UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
    console.log('hi')
    }
   }, null)
   UserSchema.virtual('password').set(function(password) {
       
    this._password = password
   
    
    this.salt = this.makeSalt()
    
    this.hashed_password = this.encryptPassword(password)
    
    
    }).get(function() {
    return this._password
    })
   
export default mongoose.model('User', UserSchema)