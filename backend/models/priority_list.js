var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('priority', new Schema({ 
    distance: {type: Number, default: 1}, 
    rate: {type: Number, default: 2},
    project_size: {type: Number, default: 3},
    completion_date: {type: Number, default: 4},
}));