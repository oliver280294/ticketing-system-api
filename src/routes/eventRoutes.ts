import { Router } from "express";
import {
  createEvent,
  getEvents,
  searchEvents,
  ticketCategories,
  updateEvent,
} from "../controllers/eventController";
import { authMiddleware } from "../middlewares/auth";

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the event
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the event
 *         time:
 *           type: string
 *           format: time
 *           description: Time of the event
 *         venue:
 *           type: string
 *           description: Venue of the event
 *         availableTickets:
 *           type: integer
 *           description: Available tickets for the event
 *       required:
 *         - name
 *         - date
 *         - time
 *         - venue
 *         - availableTickets
 *
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Successfully retrieved all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Successfully created an event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized
 *
 * /api/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Successfully updated the event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only creator can edit event)
 *       404:
 *         description: Event not found
 *
 * /api/events/search:
 *   get:
 *     summary: Search events
 *     tags:
 *       - Events
 *     parameters:
 *       - name: q
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Query to search for events
 *     responses:
 *       200:
 *         description: Successfully searched events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *
 * /api/events/{id}/tickets:
 *   get:
 *     summary: Get ticket categories for an event
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event
 *     responses:
 *       200:
 *         description: Successfully retrieved ticket categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   price:
 *                     type: number
 *                   available:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */
const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.post("/", authMiddleware, createEvent);
eventRouter.put("/:id", authMiddleware, updateEvent);
eventRouter.get("/search", searchEvents);
eventRouter.get("/:id/tickets", authMiddleware, ticketCategories);

export default eventRouter;
