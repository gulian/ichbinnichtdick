var secrets = require('../config/secrets');
var User = require('../models/User');
var Hit = require('../models/Hit');


exports.index = function(req, res) {
    console.log(req.user._id);
    // Hit.save({
    //     user:req.user._id, details: {
    //         value: 200,
    //         description: "J'ai beaucoup grossi"
    //     }
    // });
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
