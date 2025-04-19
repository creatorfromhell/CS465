const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');
const Users = require('../models/user');

const User = mongoose.model('users');


const tripsList = async(req, res) => {

    const q = await Model.find({}).exec();

    if(!q)
    {

        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

const tripsFindByCode = async(req, res) => {

    const q = await Model.find({'code': req.params.tripCode}).exec();

    if(!q)
    {

        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};


const tripsAddTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {
      try {
        const trip = await Trip.create({
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        });
  
        return res.status(201).json(trip); // Created
      } catch (err) {
        return res.status(400).json(err); // Bad Request
      }
    });
};

const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {
      try {
        const trip = await Trip.findOneAndUpdate(
          { code: req.params.tripCode },
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
          },
          { new: true }
        );
  
        if (!trip) {
          return res.status(404).send({
            message: "Trip not found with code ${req.params.tripCode}`"
          });
        }
  
        res.status(200).json(trip);
      } catch (err) {
        return res.status(500).json({
          message: "Error updating trip with code ${req.params.tripCode}",
          error: err.message || err
        });
      }
    });
};

const getUser = (req, res, callback) => {
    if (req.body && req.body.email) {             
      User
        .findOne({ email : req.body.email })  
        .exec()
        .then(user => {
            if (!user) {
                console.log("User: " + user);
                return res.status(404).json({"message": "User not found"});
            }
            callback(req, res, user.name);   
        }).catch(err =>{
            if (err) {
                console.log(err);
                return res.status(404).json(err);
               }
        });
    } else {
        console.log("no payload");
        return res.status(404).json({"message": "User not found"});
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};