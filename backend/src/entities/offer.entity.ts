import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Auction } from './auction.entity';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Auction, (auction) => auction.offers)
  auction: Auction;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Book, (book) => book.offers)
  book: Book;
}
