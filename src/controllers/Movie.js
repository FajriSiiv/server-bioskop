import { Movie } from "../model/Movie.js";
import { User } from "../model/Users.js";
import { deleteAllTicketsAfterMovieEnds } from "../utils/index.js";

export const getMovie = async (req, res) => {
  // const userId = "65d07f26a7c0f0aac1d35eed";

  try {
    // const user = await User.findOne({ _id: userId });
    const movie = await Movie.find();

    res.send(movie);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createMovie = async (req, res) => {
  const { seat, hours = 17, minutes = 0, movieMinutes = 1 } = req.body;
  const newMovie = new Movie({
    title: "Movie 2",
    genre: "Fantasi 2",
    availableSeats: Array.from({ length: seat }, (_, index) => index + 1),
  });

  deleteAllTicketsAfterMovieEnds(movieMinutes, hours, minutes, newMovie._id);

  try {
    await newMovie.save();

    res.send({ newMovie });
  } catch (error) {
    res.status(404).json(error);
  }
};
