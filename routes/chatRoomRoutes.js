const express = require('express');
const router  = express.Router();
const ChatRoom = require('../models/ChatRoom');


/* GET home page */
router.get('/showAll', (req, res, next) => {
  // this route is actually localhost:3000/api/chatroom
  // because of the preface I put on this routes file in app.js
  ChatRoom.find().populate('messages')
  .then((allTheChatRooms) => {
    res.json(allTheChatRooms);
  })
  .catch((err) => {
    res.json(err);
  })
});


router.get('/details/:id', (req, res, next) => {
  ChatRoom.findById(req.params.id).populate('messages')
  .then((singleChatRoom) => {
    res.json(singleChatRoom);
  })
  .catch((err) => {
    res.json(err);
  })
});


router.post('/create', (req, res, next) => {
  ChatRoom.create({
    title: req.body.theTitle,
    description: req.body.theDescription,
    messages: [],
    owner: req.user._id
  })
  .then((singleChatRoom) => {
    res.json(singleChatRoom);
  })
  .catch((err) => {
    res.json(err);
  })
});


router.post('/update/:id', (req, res, next) => {
  ChatRoom.findByIdAndUpdate(req.params.id, {
    title: req.body.theTitle,
    description: req.body.theDescription
  })
  .then((singleChatRoom) => {
    res.json(singleChatRoom);
  })
  .catch((err) => {
    res.json(err);
  })
});


router.delete('/delete/:id', (req, res, next) => {
  ChatRoom.findByIdAndRemove(req.params.id)
  .then(() => {
    res.status(200).json("Chatroom successfully deleted")
  })
  .catch(err => res.status(400).json("Error deleting the chatroom"))
});

module.exports = router;