import express from "express";
import {
  createMovie,
  deletedMovieById,
  getMovie,
} from "../controllers/Movie.js";
import {
  createTicket,
  deleteTicketById,
  getTicketById,
  getTickets,
} from "../controllers/Ticket.js";
import { createUser, getUser } from "../controllers/User.js";
import { checkMovieMax, checkTicketMax } from "../middleware/index.js";

const router = express.Router();

// USER ROUTER
router.get("/", getUser);
router.post("/", createUser);

// MOVIE ROUTER
router.get("/movie", getMovie);
router.post("/movie", checkMovieMax, createMovie);
router.delete("/movie/:movieId", deletedMovieById);

// TICKET ROTUTER
router.get("/ticket", getTickets);
router.get("/ticket/:ticketId", getTicketById);
router.post("/ticket", checkTicketMax, createTicket);
router.delete("/ticket/:ticketId", deleteTicketById);

// TEST
// router.get("/test", (req, res) => {
//   res.sendStatus(200);
// });

router.get("/", (req, res) => {
  res.send({ message: "Connect to database" });
});

export default router;
