import { Movie } from "../model/Movie.js";
import { Ticket } from "../model/Ticket.js";

export const checkSeatAvailability = async (movieId, seatNumber) => {
  try {
    let seatBooked;
    const movie = await Movie.findById(movieId);

    const isSeatBooked = movie.bookedSeats.filter((seat) =>
      seatNumber.includes(seat)
    );

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
  // Buat objek Date yang mewakili waktu saat ini
  const currentTime = new Date();

  // Atur waktu menjadi jam 6 sore
  const endTime = new Date(currentTime);
  endTime.setHours(hours, minutes, 0, 0); // Atur jam ke 18 (6 sore), menit ke 45, detik ke 0, dan milidetik ke 0

  // Tambahkan menit movie ke waktu yang telah diatur
  endTime.setMinutes(endTime.getMinutes() + movieMinutes);

  // Hitung selisih waktu antara waktu saat ini dan waktu yang telah diatur
  const timeDiff = endTime.getTime() - currentTime.getTime();

  // Gunakan setTimeout dengan selisih waktu untuk menjalankan fungsi deleteAllTickets
  setTimeout(() => {
    deleteAllTickets(movieId);
    deleteMovieExpired(movieId);
    console.log("hello");
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
