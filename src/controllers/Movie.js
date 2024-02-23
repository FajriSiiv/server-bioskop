import { Movie } from "../model/Movie.js";
import { User } from "../model/Users.js";
import { deleteAllTicketsAfterMovieEnds } from "../utils/index.js";
import { movieValidationSchema } from "../validations/movie.validation.js";

export const getMovie = async (req, res) => {
  try {
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
  // waktu film hanya 5 menit
  const movieMinutes = 5;
  const { seat, title, genre } = req.body;

  if (seat > 5) return res.send({ message: "Max seat only 5" });

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

    res.send({ message: "Film berhasil dibuat!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deletedMovieById = async (req, res) => {
  const { movieId } = req.params;

  try {
    await Movie.findByIdAndDelete(movieId);

    res.send({ message: "Movie berhasil di hapus" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
