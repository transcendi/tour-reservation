import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE', // FIXME!! : use constants file instead magic string
    useFactory: async () => { // FIXME!! : use configuration
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'tour-reservation',
        password: 'aA1!aA1!',
        database: 'tour_reservation',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        logging: true
      });

      return dataSource.initialize();
    },
  },
];