import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import "reflect-metadata"
import { DataSource } from "typeorm"
import { Seller, Tour, Customer, Reservation } from "./entities/entities"

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tour-reservation',
    password: 'aA1!aA1!',
    database: 'tour_reservation',
    entities: [Seller, Tour, Customer, Reservation],
    synchronize: true,
    logging: false,
})

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
