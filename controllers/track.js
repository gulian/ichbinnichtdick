var secrets = require('../config/secrets');
var User = require('../models/User');

    var Hit = require('../models/Hit');

/**
 * GET /api
 * List of API examples.
 */

exports.index = function(req, res) {

    Hit.find({ user:req.user._id }, function(err, hits){
        res.render('track', {
            title: 'Track your weight',
            hits:hits
        });
    })


};
