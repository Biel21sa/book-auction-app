import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { Offer } from './offer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  type: 'seller' | 'buyer';

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
}
