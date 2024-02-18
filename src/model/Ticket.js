import mongoose from "mongoose";

const ticketReservationSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  seatNumber: {
    type: [Number],
    required: true,
  },
  // showTime: {
  //   type: Date,
  //   required: true,
  // },
  status: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Ticket = mongoose.model(
  "TicketReservation",
  ticketReservationSchema
);
