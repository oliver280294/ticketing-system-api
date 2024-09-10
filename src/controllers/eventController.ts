import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Event } from "../entities/Event";

const eventRepository = AppDataSource.getRepository(Event);

export const createEvent = async (req: Request, res: Response) => {
  const { name, date, time, venue, availableTickets } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Pass creator as an object with the user's ID
  const event = eventRepository.create({
    name,
    date,
    time,
    venue,
    availableTickets,
    creator: { id: req.user.id }, // Use object for creator relation
  });

  await eventRepository.save(event);
  res.status(201).json(event);
};

export const getEvents = async (req: Request, res: Response) => {
  const events = await eventRepository.find();
  res.json(events);
};

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const { name, date, time, venue, availableTickets } = req.body;
  const userId = req.user?.id; // Authenticated user's ID

  const eventRepository = AppDataSource.getRepository(Event);

  // Fetch the event and load the creator relation
  const event = await eventRepository.findOne({
    where: { id: Number(eventId) },
    relations: ["creator"], // Load the creator relation if not using eager loading
  });

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Check if the authenticated user is the creator of the event
  if (event.creator.id !== userId) {
    return res
      .status(403)
      .json({ message: "You are not authorized to edit this event" });
  }

  // Update event details
  event.name = name || event.name;
  event.date = date || event.date;
  event.time = time || event.time;
  event.venue = venue || event.venue;
  event.availableTickets = availableTickets || event.availableTickets;

  await eventRepository.save(event);

  res.json({ message: "Event updated successfully", event });
};

export const ticketCategories = async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id);

  try {
    const event = await eventRepository.findOne({
      where: { id: eventId },
      relations: ["ticketCategories"], // Load ticket categories with the event
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event.ticketCategories); // Return the ticket categories
  } catch (error) {
    console.error("Error fetching ticket categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchEvents = async (req: Request, res: Response) => {
  const { q } = req.query;

  const events = await eventRepository
    .createQueryBuilder("event")
    .where("event.name ILIKE :q OR event.venue ILIKE :q", { q: `%${q}%` })
    .getMany();
  res.json(events);
};
