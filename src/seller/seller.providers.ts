import { DataSource } from 'typeorm';
import { Seller } from './entities/seller.entity';

export const sellerProviders = [
  {
    provide: 'SELLER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Seller),
    inject: ['DATA_SOURCE'],
  },
];