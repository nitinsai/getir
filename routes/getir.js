var express = require('express');
var router = express.Router();
const db = require('../dataAccess');
const records = require('../dataAccess/record');

var Joi = require('joi');

/* GET home page. */
router.get('/', function(req, res, next) {
    
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){

    let response = {
        code : 0,
        msg : "success",
        records : []
    }

    if(validateReq(req.body)){
        try{

            let dateRange = {$match : { createdAt : {"$gte" : new Date(req.body.startDate+"T00:00:00.000Z"), '$lt' : new Date(req.body.endDate+"T23:59:59.999Z")}}};
    
            let projection = {$project: {'_id' : false, key: true, createdAt : true, totalCount :  {'$sum' : "$counts"}}}
    
            let countRange = {$match : {totalCount : {"$gt" : req.body.minCount, "$lt" : req.body.maxCount }}}
    
            records.aggregate([dateRange, projection, countRange]).then(function(recs){
    
                response.records = recs;
                res.send(response);
    
            });
        }catch(e){
            response.code = 1;
            response.msg= "failure";
            response.records = [];
            res.status(500).send(response)
        }
    }else{
        response.code = 1;
        response.msg= "failure";
        response.records = [];
        res.status(422).send(response)
    }
    
    
    
    
})


function validateReq(req){
    const schema = Joi.object({
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        maxCount: Joi.number().required(),
        minCount: Joi.number().required()
    });
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req, options);
    
    if (error) {
       
        return false;
    } else {
        return true;
    }
    
}



module.exports = router;
