import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from 'typeorm';
import { Tour } from '../../tour/entities/tour.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Tour, (tour) => tour.seller)
  tours: Tour[];
}
