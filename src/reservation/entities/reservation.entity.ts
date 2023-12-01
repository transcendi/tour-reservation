import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Tour } from '../../tour/entities/tour.entity';

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
  date: Date;

  @Column({
    type: "enum",
    enum: ReservationState
  })
  state: ReservationState;

  @ManyToOne(() => Customer, (customer) => customer.reservations)
  customer: Customer;

  @ManyToOne(() => Tour, (tour) => tour.reservations)
  tour: Tour;
}
