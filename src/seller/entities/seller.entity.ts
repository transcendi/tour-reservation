import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from 'typeorm';
import { Tour } from '../../tour/entities/tour.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array', {nullable: true})
  off_days: number[];

  @Column('simple-array', {nullable: true})
  off_dates: number[];

  @OneToMany(() => Tour, (tour) => tour.seller)
  tours: Tour[];
}