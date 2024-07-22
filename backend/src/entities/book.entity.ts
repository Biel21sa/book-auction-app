import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Auction } from './auction.entity';
import { Offer } from './offer.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @OneToMany(() => Auction, (auction) => auction.book)
  auctions: Auction[];

  @OneToMany(() => Offer, (offer) => offer.book)
  offers: Offer[];
}
