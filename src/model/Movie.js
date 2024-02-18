// Movie.js
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: [Number],
    required: true,
  },
  bookedSeats: {
    type: [Number],
    default: [],
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
