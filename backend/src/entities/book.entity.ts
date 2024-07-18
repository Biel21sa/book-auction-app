import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Auction } from './auction.entity';

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

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @OneToMany(() => Auction, (auction) => auction.book)
  auctions: Auction[];
}
