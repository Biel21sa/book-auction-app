import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Book } from './book.entity';
import { Offer } from './offer.entity';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.auctions)
  book: Book;

  @Column()
  endTime: Date;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers: Offer[];
}
