const mongoose = require('mongoose');
const Schema    = mongoose.Schema;

const meetUpSchema = new Schema({
  title: String,
  location: {
    streetAddress: String,
    city: String,
    state: String,
    country: String,
  },
  owner: {type: Schema.Types.ObjectId, ref: "User"},
  participants: {type: Schema.Types.ObjectId, ref: "User"},
  type: String,
  description: String,
  going: {type: Schema.Types.ObjectId, ref: "User"},
  notGoing: {type: Schema.Types.ObjectId, ref: "User"},
  checkin: [{type: Schema.Types.ObjectId , ref: 'User'}],
  leaving: [{type: Schema.Types.ObjectId , ref: 'User'}],
  time: Date,
});

module.exports = mongoose.model('MeetUp', meetUpSchema);