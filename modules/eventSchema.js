const mongooose = require('mongoose');

const eventSchema = new mongooose.Schema({
    
  title:{type: String,required: true },
  description:{type: String,required: true },
  location:{type: String,required: true},
  starttime:{type: Date,required: true},
  endtime:{type: Date,required: true},
})

const event = mongooose.model('Event', eventSchema);

module.exports = event;