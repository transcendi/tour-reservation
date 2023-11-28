import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from 'typeorm';
import { Tour } from '../../tour/entities/tour.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  rest_days: number[];

  @Column('simple-array')
  days_off: number[];

  @OneToMany(() => Tour, (tour) => tour.seller)
  tours: Tour[];
}