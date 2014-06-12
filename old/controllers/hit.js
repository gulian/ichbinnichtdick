var secrets = require('../config/secrets');
var User = require('../models/User');
var Hit = require('../models/Hit');


exports.add = function(req, res) {
    console.log(req.user._id);
    var hit = new Hit({
        user:req.user._id, details: {
            value: 200,
            description: "J'ai beaucoup grossi"
        }
    });
    hit.save(function(error){
        console.log(error);
    }) ;
    res.render('track', {
        title: 'Track your weight'
    });
};


exports.getAll = function(req, res){
    Hit.find({ user:req.user._id }, function(err, hits){
        res.send(hits);
    })
};

