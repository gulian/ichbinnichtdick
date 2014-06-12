var Hit = require('../models/Hit');

exports.add = function(req, res) {
    var hit = new Hit({
        user:req.user._id, details: req.hit
    });
    hit.save(function(error){
        if(error){
            return res.send(500, error);
        }
        res.send(200);
    }) ;
};

exports.getAll = function(req, res){
    Hit.find(req.user ? { user:req.user._id } : {}, function(err, hits){
        res.send(hits);
    })
};
