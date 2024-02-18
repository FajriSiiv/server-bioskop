import { Movie } from "../model/Movie.js";
import { Ticket } from "../model/Ticket.js";
import { checkSeatAvailability } from "../utils/index.js";

export const createTicket = async (req, res) => {
  const { seatNumber, movieId } = req.body;

  const userId = "65d08b036eb4201e2e579e5b";

  try {
    const checkingSeats = await checkSeatAvailability(movieId, seatNumber);

    if (checkingSeats)
      return res.send({ message: "Kursi yang dipilh sudah dipesan" });

    const ticket = await Ticket.create({
      movie: movieId,
      seatNumber: seatNumber,
      showTime: new Date(),
      status: true,
      user: userId,
    });

    const movie = await Movie.findById(movieId);
    const updatedAvailableSeats = movie.availableSeats.filter(
      (seat) => !seatNumber.includes(seat)
    );
    const updatedBookedSeats = [...movie.bookedSeats, ...seatNumber];

    await Movie.findByIdAndUpdate(movieId, {
      availableSeats: updatedAvailableSeats,
      bookedSeats: updatedBookedSeats,
    });

    // setTimeout(() => {
    //   deleteTicket(ticket._id);
    // }, 60 * 1000);

    res.send(ticket);
  } catch (error) {
    res.send({ error: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const ticket = await Ticket.find()
      .populate("user")
      .populate({ path: "movie", select: ["-availableSeats", "-bookedSeats"] });

    res.send(ticket);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getTicketById = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);

    res.send(ticket);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteTicket = async (ticketId) => {
  try {
    await Ticket.findByIdAndDelete(ticketId);
    console.log(`Ticket with ID ${ticketId} has been deleted.`);
  } catch (error) {
    console.error("Error while deleting ticket:", error);
    throw error;
  }
};
