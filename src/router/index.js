import express from "express";
import { createMovie, getMovie } from "../controllers/Movie.js";
import {
  createTicket,
  getTicketById,
  getTickets,
} from "../controllers/Ticket.js";
import { createUser, getUser } from "../controllers/User.js";

const router = express.Router();

// USER ROUTER
router.get("/", getUser);
router.post("/", createUser);

// MOVIE ROUTER
router.get("/movie", getMovie);
router.post("/movie", createMovie);

// TICKET ROTUTER
router.get("/ticket", getTickets);
router.get("/ticket:id", getTicketById);
router.post("/ticket", createTicket);

export default router;
