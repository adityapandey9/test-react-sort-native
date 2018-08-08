var mongoose = require('mongoose');

//Creating the Table for storing the data from projects.json
var DataSchema = new mongoose.Schema({
  distance: Number,
  rate: Number,
  project_size: Number,
  completion_date: { type: Date, default: Date.now },
});
  
  //Exporting the model
  module.exports = mongoose.model('data', DataSchema);