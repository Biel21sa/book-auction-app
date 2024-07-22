import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from '../entities/book.entity';
import { AuthModule } from '../auth/auth.module';
import { Offer } from 'src/entities/offer.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Offer, User]), AuthModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
