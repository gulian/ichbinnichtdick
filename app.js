var express = require('express'),
    hit = require('./routes/hit'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    packagejson =  require('./package');

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(require('less-middleware')('./public'));
app.use(express.static('./public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

mongoose.connect(process.env.MONGODB|| 'mongodb://localhost:27017/ichbinnichtdick');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var auth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};

var User = require('./models/User');

passport.use(new LocalStrategy(function(username, password, done) {
    User.find({email:username, password : password}, function(err, users){
        if (err || !users || users.length !== 1) {
            return done(err);
        } else {
            done(null, users[0]);
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.all('*', function(req, res, n) {
    n();
});


app.get('/hit', hit.getAll);
// app.get('/hit', auth, hit.getAll);
app.post('/hit',hit.add);
app.delete('/hit',hit.delete);
// app.post('/hit', auth, hit.add);


app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});

app.post('/logout', function(req, res) {
    req.logOut();
    res.send(200);
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('ibnd server listening on port ' + app.get('port'));
});

