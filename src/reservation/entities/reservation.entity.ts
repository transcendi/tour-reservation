import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tour } from '../../tour/entities/tour.entity';
import { Customer } from '../../customer/entities/customer.entity';

export enum ReservationState {
  PENDING = "pending",
  CANCEL = "cancel",
  CONFIRM = "confirm"
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column({
    type: "enum",
    enum: ReservationState
  })
  state: ReservationState;

  @ManyToOne(() => Tour, (tour) => tour.reservations)
  tour: Tour;

  @ManyToOne(() => Tour, (customer) => customer.reservations)
  customer: Customer;
}