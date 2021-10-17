const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
 usernameField: 'email'}, async(email, password, done) =>{
     const user = await User.findOne({email: email})
     if (!user) {
         return done(null, false, {message: 'No existe ese usuario'})
     } else {
         const match = await user.comparePassword(password);
         if (match) {
             return done(null, user)
         } else {
            return done(null, false, {message: 'La contraseña es errónea'})
         }
     }
 }))

 passport.serializeUser((user, done) =>{
    done(null, user.id)
 })

 passport.deserializeUser((id, done) =>{
     User.findById(id, (err,user) =>{
        done(null, user)
     }).lean()
 })