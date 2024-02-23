import { Movie } from "../model/Movie.js";
import { Ticket } from "../model/Ticket.js";

export const checkSeatAvailability = async (movieId, seatNumber) => {
  try {
    let seatBooked;
    const movie = await Movie.findById(movieId);

    const isSeatBooked = movie.bookedSeats.filter((seat) =>
      seatNumber.includes(seat)
    );
    console.log(isSeatBooked);
    if (isSeatBooked.length === 0) return seatBooked;

    return !seatBooked;
  } catch (error) {
    console.error("Error while checking seat availability:", error);
    throw error;
  }
};

export const deleteAllTickets = async (movieId) => {
  try {
    await Ticket.deleteMany({
      movie: movieId,
    });
    console.log(`Semua tiket sudah dihapus`);
  } catch (error) {
    console.error("Error while deleting ticket:", error);
    throw error;
  }
};

export const deleteAllTicketsAfterMovieEnds = (
  movieMinutes,
  hours,
  minutes,
  movieId
) => {
  const currentTime = new Date();

  const endTime = new Date(currentTime);
  endTime.setHours(hours, minutes, 0, 0);

  endTime.setMinutes(endTime.getMinutes() + movieMinutes);

  const timeDiff = endTime.getTime() - currentTime.getTime();

  setTimeout(() => {
    deleteAllTickets(movieId);
    deleteMovieExpired(movieId);
  }, timeDiff);
};

const deleteMovieExpired = async (movieId) => {
  try {
    await Movie.deleteOne({ _id: movieId });

    console.log("Movie " + movieId + " telah dihapus");
  } catch (error) {
    console.error("Error while deleting ticket:", error);
    throw error;
  }
};
