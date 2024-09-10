import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import { TicketCategory } from "./TicketCategory";
import { User } from "./User";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  date!: string;

  @Column()
  time!: string;

  @Column()
  venue!: string;

  @Column()
  availableTickets!: number;

  // A user can create many events
  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets!: Ticket[]; // Ensure this property is defined correctly

  @OneToMany(() => TicketCategory, (ticketCategory) => ticketCategory.event)
  ticketCategories!: TicketCategory[]; // The ticket categories for the event

  // Many events can be created by one user (creator)
  @ManyToOne(() => User, (user) => user.events)
  creator!: User; // Define the creator property as a relation to User entity
}
