const express = require("express");
const axios = require("axios");
const Itinerary=require("../models/Itinerary")
const router = express.Router();

const travelData = {
  destinations: {
    Agra: {
      activities: [
        { name: "Visit Taj Mahal", cost: 50, interest: "sightseeing" },
        { name: "Explore Agra Fort", cost: 30, interest: "culture" },
        { name: "Visit Mehtab Bagh", cost: 10, interest: "nature" },
        { name: "Sample Local Sweets", cost: 5, interest: "food" },
        { name: "Attend a Local Festival", cost: 0, interest: "culture" },
        { name: "Take a Heritage Walk", cost: 15, interest: "culture" },
        { name: "Visit Wildlife SOS", cost: 25, interest: "nature" },
        { name: "Shopping in Local Markets", cost: 20, interest: "shopping" },
        { name: "Go on a Photography Tour", cost: 40, interest: "photography" },
        { name: "Try Paragliding", cost: 100, interest: "adventure" },
        { name: "Relax at a Spa", cost: 50, interest: "relaxation" },
        { name: "Join a Night Safari", cost: 70, interest: "wildlife" },
      ],
      accommodations: [
        { name: "Luxury Hotel", cost: 2000, interest: "luxury" },
        { name: "Budget Hotel", cost: 500, interest: "budget" },
        { name: "Boutique Hotel", cost: 1500, interest: "luxury" },
      ],
      restaurants: [
        { name: "Peshawri", cost: 600, interest: "fine dining" },
        { name: "Dasaprakash", cost: 200, interest: "local" },
        { name: "Café Coffee Day", cost: 100, interest: "casual" },
      ],
      transportation: [
        { type: "Auto Rickshaw", cost: 15, interest: "budget" },
        { type: "Taxi", cost: 300, interest: "convenience" },
        { type: "Bike Rental", cost: 200, interest: "adventure" },
      ],
    },
    Delhi: {
      activities: [
        { name: "Visit India Gate", cost: 20, interest: "sightseeing" },
        { name: "Explore Red Fort", cost: 30, interest: "culture" },
        {
          name: "Enjoy Local Food at Chandni Chowk",
          cost: 15,
          interest: "food",
        },
        { name: "Visit Qutub Minar", cost: 25, interest: "sightseeing" },
        { name: "Shop at Dilli Haat", cost: 10, interest: "shopping" },
        { name: "Explore Humayun's Tomb", cost: 20, interest: "history" },
        { name: "Visit Akshardham Temple", cost: 10, interest: "culture" },
        { name: "Attend a Music Concert", cost: 500, interest: "music" },
        { name: "Try a Food Walk", cost: 300, interest: "food" },
        { name: "Go on a Historical Tour", cost: 400, interest: "history" },
        { name: "Relax in Lodhi Gardens", cost: 0, interest: "relaxation" },
        {
          name: "Photography Tour in Old Delhi",
          cost: 350,
          interest: "photography",
        },
      ],
      accommodations: [
        { name: "Luxury Hotel", cost: 2500, interest: "luxury" },
        { name: "Budget Hotel", cost: 600, interest: "budget" },
        { name: "Boutique Hotel", cost: 1800, interest: "luxury" },
      ],
      restaurants: [
        { name: "Bukhara", cost: 700, interest: "fine dining" },
        { name: "Karol Bagh", cost: 300, interest: "local" },
        { name: "Dilli Haat", cost: 250, interest: "casual" },
      ],
      transportation: [
        { type: "Metro", cost: 10, interest: "budget" },
        { type: "Taxi", cost: 300, interest: "convenience" },
        { type: "Cycle Rickshaw", cost: 5, interest: "budget" },
      ],
    },
    Hyderabad: {
      activities: [
        { name: "Visit Charminar", cost: 20, interest: "sightseeing" },
        { name: "Explore Golconda Fort", cost: 30, interest: "history" },
        {
          name: "Visit Ramoji Film City",
          cost: 1000,
          interest: "entertainment",
        },
        { name: "Hyderabadi Biryani Tasting", cost: 250, interest: "food" },
        { name: "Visit Necklace Road", cost: 10, interest: "nature" },
        { name: "Explore Shilparamam", cost: 15, interest: "culture" },
        { name: "Visit Chowmohalla Palace", cost: 20, interest: "history" },
        {
          name: "Attend a Traditional Dance Show",
          cost: 400,
          interest: "culture",
        },
        {
          name: "Photography Tour at Hussain Sagar",
          cost: 350,
          interest: "photography",
        },
        { name: "Visit Birla Mandir", cost: 10, interest: "sightseeing" },
        { name: "Go on a Food Tour", cost: 300, interest: "food" },
        { name: "Relax at Lumbini Park", cost: 5, interest: "relaxation" },
      ],
      accommodations: [
        { name: "Luxury Hotel", cost: 1800, interest: "luxury" },
        { name: "Budget Hotel", cost: 400, interest: "budget" },
        { name: "Boutique Hotel", cost: 1500, interest: "luxury" },
      ],
      restaurants: [
        { name: "Paradise Biryani", cost: 300, interest: "local" },
        { name: "Shah Ghouse", cost: 250, interest: "local" },
        { name: "Cafe Niloufer", cost: 150, interest: "casual" },
      ],
      transportation: [
        { type: "Metro", cost: 10, interest: "budget" },
        { type: "Cab", cost: 350, interest: "convenience" },
        { type: "Biking", cost: 50, interest: "adventure" },
      ],
    },
  },
};

router.post("/generate", async (req, res) => {
  console.log("Received request:", req.body);
  const { destination, budget, interests, duration } = req.body;

  if (!destination || !budget || !interests || !duration) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const API_KEY = `cc6843cf4fc35eee6908dda580b0ad61`;
  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${API_KEY}&units=metric`
    );
    const weather = weatherResponse.data.weather[0].main;

    const place = travelData.destinations[destination];
    if (!place) {
      return res.status(404).json({ message: "Destination not found" });
    }

    let suggestedActivities = place.activities.filter((activity) => {
      if (weather === "Rain" && activity.interest === "outdoor") return false;
      return (
        interests.includes(activity.interest) ||
        interests.includes("Activities")
      );
    });

    const filteredAccommodations = place.accommodations.filter((acc) =>
      interests.includes(acc.interest)
    );

    const filteredRestaurants = place.restaurants.filter((res) =>
      interests.includes(res.interest)
    );

    const filteredTransportation = place.transportation.filter((trans) =>
      interests.includes(trans.interest)
    );

    const dailyItinerary = [];
    for (let i = 0; i < duration; i++) {
      const activitiesForDay = suggestedActivities.slice(i * 2, i * 2 + 2);

      if (activitiesForDay.length === 0) {
        dailyItinerary.push({
          day: i + 1,
          activities: [{ name: "No activities available for this day." }],
        });
      } else {
        dailyItinerary.push({
          day: i + 1,
          activities: activitiesForDay,
        });
      }
    }

    const itinerary = {
      destination,
      accommodations:
        filteredAccommodations.length > 0
          ? filteredAccommodations
          : place.accommodations,
      restaurants:
        filteredRestaurants.length > 0
          ? filteredRestaurants
          : place.restaurants,
      transportation:
        filteredTransportation.length > 0
          ? filteredTransportation
          : place.transportation,
      dailyItinerary,
    };

    return res.status(200).json({ itinerary });
  } catch (error) {
    console.error("Error generating itinerary:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/itineraries", async (req, res) => {
  try {
    console.log("Request Body: ", req.body); 

    
    const newItinerary = new Itinerary(req.body);

    console.log("New Itinerary: ", newItinerary); 
    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    console.log("Error: ", error); 
    res.status(400).json({ message: error.message });
  }
});



router.get("/itineraries/:userId", async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.params.userId });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
