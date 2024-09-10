import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";
import { Ticket } from "./Ticket";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  // A user can create many events
  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets!: Ticket[]; // Ensure this property is defined correctly

  // A user can create many events
  @OneToMany(() => Event, (event) => event.creator)
  events!: Event[]; // Ensure this property is defined correctly
}
