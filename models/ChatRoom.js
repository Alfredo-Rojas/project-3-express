const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatRoomSchema = new Schema({
  title: String,
  description: String,
  messages: [{
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    timestamp: Date,
    manssage: String,
  }],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);


module.exports = ChatRoom;