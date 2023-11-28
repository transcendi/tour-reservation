import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Seller } from '../../seller/entities/seller.entity';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Seller, (seller) => seller.tours)
  seller: Seller;

  @OneToMany(() => Reservation, (reservation) => reservation.tour)
  reservations: Reservation[];
}