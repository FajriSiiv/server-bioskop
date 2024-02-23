import { Movie } from "../model/Movie.js";
import { Ticket } from "../model/Ticket.js";

// Membatasi jumlah movie database
export const checkMovieMax = async (req, res, next) => {
  const checkMovie = await Movie.find();

  if (checkMovie.length >= 1) {
    return res.send({ message: "Movie kamu sudah mencapai batas" });
  }

  next();
};

// Membatasi jumlah ticket database
export const checkTicketMax = async (req, res, next) => {
  const checkTicket = await Ticket.find();

  if (checkTicket.length >= 6) {
    return res.send({ message: "Tiket kamu sudah mencapai batas" });
  }

  next();
};
