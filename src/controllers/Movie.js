import { Movie } from "../model/Movie.js";
import { User } from "../model/Users.js";
import { deleteAllTicketsAfterMovieEnds } from "../utils/index.js";
import { movieValidationSchema } from "../validations/movie.validation.js";

export const getMovie = async (req, res) => {
  try {
    // const user = await User.findOne({ _id: userId });
    const movie = await Movie.find();

    res.send(movie);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createMovie = async (req, res) => {
  const currentTime = new Date();
  const hoursNow = currentTime.getHours();
  const minutesNow = currentTime.getMinutes();
  const movieMinutes = 2;
  const { seat, title, genre } = req.body;

  const newMovie = new Movie({
    title: title,
    genre: genre,
    availableSeats: Array.from({ length: seat }, (_, index) => index + 1),
  });

  deleteAllTicketsAfterMovieEnds(
    movieMinutes,
    hoursNow,
    minutesNow,
    newMovie._id
  );

  try {
    await movieValidationSchema.validateAsync({
      seat,
      title,
      genre,
    });

    await newMovie.save();

    res.send({ newMovie });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
