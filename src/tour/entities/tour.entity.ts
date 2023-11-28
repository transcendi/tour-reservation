import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Seller } from '../../seller/entities/seller.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Seller, (seller) => seller.tours)
  seller: Seller
}