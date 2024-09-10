import { Router } from "express";
import { ticketHistory, ticketPurchase } from "../controllers/ticketController";
import { authMiddleware } from "../middlewares/auth";

/**
 * @swagger
 * components:
 *   schemas:
 *     TicketPurchase:
 *       type: object
 *       properties:
 *         eventId:
 *           type: integer
 *           description: ID of the event
 *         quantity:
 *           type: integer
 *           description: Number of tickets to purchase
 *       required:
 *         - eventId
 *         - quantity
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Ticket ID
 *         event:
 *           $ref: '#/components/schemas/Event'
 *         quantity:
 *           type: integer
 *           description: Number of tickets purchased
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *           description: ID of the user who purchased the ticket
 *     TicketHistory:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Ticket'
 *
 * /api/tickets/purchase:
 *   post:
 *     summary: Purchase a ticket for an event
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketPurchase'
 *     responses:
 *       201:
 *         description: Ticket successfully purchased
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Insufficient tickets available or invalid event
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *
 * /api/tickets/history:
 *   get:
 *     summary: Get purchase history of the authenticated user
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved ticket history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketHistory'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
const ticketRouter = Router();

ticketRouter.post("/purchase", authMiddleware, ticketPurchase);
ticketRouter.get("/history", authMiddleware, ticketHistory);

export default ticketRouter;
