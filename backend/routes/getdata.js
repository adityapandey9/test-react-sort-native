var express = require('express');
var router = express.Router();
var DataList = require('../models/data_list');
var PriorityList = require('../models/priority_list');
var file = require('fs');
var mongoose = require('mongoose');
var path = require('path')
var content = file.readFileSync(path.resolve(__dirname, 'projects.json'));

router.get('/setup', function(req, res) {
      // create a sample user
      const priority = new PriorityList({});

      content = JSON.parse(content);
      // save the sample user
      priority.save(function(err) {
        if (err) return res.json({success: false, data: err})
        DataList.insertMany(content.projects, (errt, rest)=>{
          if (errt) return res.json({success: false, data: errt})

          res.json({success: true, data: "Setup has been done"});
        })
      });
      
});

router.get('/', function(req, res){
  DataList.find(function(err, resp){
    if (err) return res.json({success: false, data: err})

    PriorityList.findOne((err, respt)=>{
      if (err) return res.json({success: false, data: err})
      
      var obj = {};
      for(let key in respt){
        switch(key){
          case "distance":
            obj[respt[key]+""] = key;
            break;
          case "rate":
            obj[respt[key]+""] = key;
            break;
          case "project_size":
            obj[respt[key]+""] = key;
            break;
          case "completion_date":
            obj[respt[key]+""] = key;
            break;
        }
      }
      resp.sort((obj1, obj2)=>{
        if(obj1[obj["1"]] == obj2[obj["1"]]){
          if(obj1[obj["2"]] == obj2[obj["2"]]){
            if(obj1[obj["3"]] == obj2[obj["3"]]){
              if(obj1[obj["4"]] < obj2[obj["4"]]){
                return (obj2[obj["4"]] - obj1[obj["4"]]);
              }
            } else {
              return (obj2[obj["3"]] - obj1[obj["3"]]);
            }
          } else {
            return (obj2[obj["2"]] - obj1[obj["2"]]);
          }
        } else {
          return (obj2[obj["1"]] - obj1[obj["1"]]);
        }
      });
      res.json({success: true, data: resp});
    });
  });
});

module.exports = router;