import { DataSource } from "typeorm";
import { Event } from "./entities/Event";
import { Ticket } from "./entities/Ticket";
import { TicketCategory } from "./entities/TicketCategory";
import { User } from "./entities/User";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "root",
  database: process.env.POSTGRES_DB || "ticketdb",
  synchronize: true,
  logging: false,
  entities: [User, Event, Ticket, TicketCategory],
  migrations: [],
  subscribers: [],
});
