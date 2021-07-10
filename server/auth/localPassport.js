const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const userDB = require('../models/user')


passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    async function (username, password, done) {
        console.log('Passport is asking to authenticate user: ', username, ' with password ', password);
        try {
            const user = await userDB.checkLogin(username, password);
            if (user) {
                //console.log(user);
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect email or password' })
            }
        } catch (error) {
            return done(error);
        }
    }
));


passport.serializeUser(async function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (_id, done) {
    try {
        const user = await userDB.findById(_id);
        if (user) {
            done(null, { _id: _id, userType: user.userType });
        } else {
            done("No such user", false);
        }
    } catch (error) {
        done(error, false);
    }
})
