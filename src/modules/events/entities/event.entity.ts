import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';
import { WaitingList } from '../../booking/entities/waitingList.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  totalTickets: number;

  @Column()
  availableTickets: number;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];

  @OneToMany(() => WaitingList, (waitingList) => waitingList.event)
  waitingList: WaitingList[];
}
