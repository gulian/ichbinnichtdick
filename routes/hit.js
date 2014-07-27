var Hit = require('../models/Hit');

exports.add = function(req, res) {
    var hit = new Hit({
        user: req.user._id,
        details: req.body.hit
    });

    hit.save(function(error) {
        if (error) {
            return res.send(500, error);
        }
        res.send(200);
    });
};

exports.getAll = function(req, res) {
    Hit.find(req.user ? {
        user: req.user._id
    } : {}, function(err, hits) {
        res.send(hits);
    })
};

exports.delete = function(req, res) {
    console.log(req);
    Hit.findOne(req.user ? {
        _id: req.query.id
    } : {}, function(err, hit) {
        if(hit){

        hit.remove(function(erro){
            if(erro){
                res.send(500, erro);
            } else {
                res.send(200) ;
            }
        });
        }
        // res.send(hits);
    })
};
