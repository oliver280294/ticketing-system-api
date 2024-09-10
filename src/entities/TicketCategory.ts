// src/entities/TicketCategory.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity()
export class TicketCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Event, (event) => event.ticketCategories)
  event!: Event; // The event this category belongs to

  @Column()
  name!: string; // e.g., "VIP", "General Admission"

  @Column("decimal")
  price!: number; // Price for the ticket category

  @Column()
  availableQuantity!: number; // Available tickets in this category
}
