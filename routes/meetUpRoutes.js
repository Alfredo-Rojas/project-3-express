const express = require('express');
const router  = express.Router();

const MeetUp  = require('../models/MeetUp');
const User    = require('../models/User');


// GET home page
router.get('/showAll', (req, res, next) => {
  //this route is actually localhost:3000/api/meetup
  //because of the preface I put on this routes file in app.js
  MeetUp.find().populate('theUser')
  .then((singleMeetUp) => {
    res.json(singleMeetUp);
  })
  .catch((err) => {
    res.json(err);
  })
});


router.get('/details/:id', (req, res, next) => {
  MeetUp.findById(req.params.id).populate('theUser')
  .then((singleMeetUp) => {
    res.json(singleMeetUp);
  })
  .catch((err) => {
    res.json(err);
  })
});


router.post('/create', (req, res, next) => {
  MeetUp.create({
    title: req.body.theTitle,
    location: {
      streetAddress: req.body.theStreetAddress,
      city: req.body.theCity,
      state: req.body.theState,
      country: req.body.theCountry,
    },
    owner: req.user._id,
    participants: req.user._id,
    type: req.body.theType,
    description: req.body.theDescription,
    going: req.user._id,
    notGoing: req.user._id,
    checkin: [req.user._id,],
    leaving: [req.user._id,],
    time: req.body.theDate,

  })
})


router.post('/update/:id', (req, res, next) => {
  MeetUp.findByIdAndUpdate(req.params.id, {
    title: req.body.theTitle,
    description: req.body.theDescription,
    location: {
      streetAddress: req.body.theStreetAddress,
      city: req.body.theCity,
      state: req.body.theState,
      country: req.body.theCountry,
    },
    type: req.body.theType,
    description: req.body.theDescription,
    time: req.body.theDate,
  })
  .then((singleMeetUp)=> {
    res.json(singleMeetUp);
  })
  .catch((err) => {
    res.json(err);
  })
});


router.delete('/delete/:id', (req, res, next) => {
  MeetUp.findOneAndRemove(req.params.id)
  .then(() => {  
    res.status(200).json('Meetup successfully deleted')
  })
  .catch(err => res.status(400).json('Error deleting the Meetup'))
})