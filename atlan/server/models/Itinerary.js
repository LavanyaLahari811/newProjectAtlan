const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  destination: { type: String, required: true },
  activities: [{ name: String, cost: Number }],
  accommodations: [{ name: String, cost: Number }],
  restaurants: [{ name: String, cost: Number }],
  transportation: [{
    type: {
      type: String, 
      required: true, 
    },
    cost: {
      type: Number,
      required: true, 
    },
    interest: { type: String } 
  }],
});

const Itinerary = mongoose.model("itinerary", ItinerarySchema);
module.exports = Itinerary;
