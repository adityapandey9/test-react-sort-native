var express = require('express');
var router = express.Router();
var PriorityList = require('../models/priority_list');
var mongoose = require('mongoose');

/* GET Priority Listing. */
router.get('/', function(req, res, next) {
  PriorityList.find(function (err, lists) {
    if (err) return res.json({success: false, data: err})
    res.json({success: true, data: lists});
  });
});

/* Save Priority List */
router.post('/:id', function(req, res, next){
  PriorityList.findByIdAndUpdate(req.params.id, req.body, (err, resp)=>{
    if(err) return res.json({success: false, data: err});
    res.json({success: true, data: "data Updated"});
  });
});

module.exports = router;
