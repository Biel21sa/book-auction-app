import { DataSource } from 'typeorm';
import { Auction } from './entities/auction.entity';
import { Offer } from './entities/offer.entity';
import { Book } from './entities/book.entity';
import { User } from './entities/user.entity';
import * as dotenv from 'dotenv';
import { Type } from './entities/userRole.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Auction, Offer, Book, User, Type],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: true,
});
