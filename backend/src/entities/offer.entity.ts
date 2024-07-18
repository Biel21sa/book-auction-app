import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Book, (book) => book.auctions)
  book: Book;
}
