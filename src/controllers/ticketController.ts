import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Event } from "../entities/Event";
import { Ticket } from "../entities/Ticket";

const eventRepository = AppDataSource.getRepository(Event);
const ticketRepository = AppDataSource.getRepository(Ticket);

export const ticketPurchase = async (req: Request, res: Response) => {
  const { eventId, quantity } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Check if the event exists and has enough available tickets
    const event = await eventRepository.findOneBy({ id: eventId });

    if (!event || event.availableTickets < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient tickets available" });
    }

    // Create a new ticket
    const ticket = ticketRepository.create({
      event,
      user: { id: req.user.id }, // Assuming you have a user property on the token
      quantity,
    });

    await ticketRepository.save(ticket);

    // Update available tickets in the event
    event.availableTickets -= quantity;
    await eventRepository.save(event);

    res.status(201).json(ticket); // Return the created ticket
  } catch (error) {
    console.error("Error purchasing ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const ticketHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id; // Get user ID from the authenticated request

    // Fetch tickets associated with the user
    const tickets = await ticketRepository.find({
      where: { user: { id: userId } }, // Use the user ID to filter tickets
      relations: ["event"], // Optionally, include related event details
    });

    res.json(tickets); // Return the ticket history to the user
  } catch (error) {
    console.error("Error fetching ticket history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
