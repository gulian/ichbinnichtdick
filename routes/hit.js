var Hit = require('../models/Hit');

exports.add = function(req, res) {
    var hit = req.body.hit;
        hit.user = req.user._id ;
        console.log(hit);
    hit = new Hit(hit);

    hit.save(function(error){
        if(error){
            console.log(error);
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
