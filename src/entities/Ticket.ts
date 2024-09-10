// src/entities/Ticket.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.tickets)
  user!: User; // The user who purchased the ticket

  @ManyToOne(() => Event, (event) => event.tickets)
  event!: Event; // The event associated with the ticket

  @Column()
  quantity!: number; // The number of tickets purchased

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  purchaseDate?: Date; // The date when the ticket was purchased
}
