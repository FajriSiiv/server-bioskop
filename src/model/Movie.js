import mongoose from "mongoose";

const currentTime = new Date();

const newShowtime = new Date(currentTime.getTime() + 5 * 60000);

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
  showtime: {
    type: Date,
    required: true,
    default: newShowtime,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
