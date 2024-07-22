import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from 'src/entities/book.entity';
import { User } from 'src/entities/user.entity';
import { Offer } from 'src/entities/offer.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBookDto: CreateBookDto, user: User): Promise<Book> {
    const book = this.bookRepository.create({ ...createBookDto, user });
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['offers'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['offers'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async filterBooks(
    title?: string,
    author?: string,
    genre?: string,
  ): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder('book');

    if (title) {
      query.andWhere('book.title ILIKE :title', { title: `%${title}%` });
    }

    if (author) {
      query.andWhere('book.author ILIKE :author', { author: `%${author}%` });
    }

    if (genre) {
      query.andWhere('book.genre ILIKE :genre', { genre: `%${genre}%` });
    }

    return query.getMany();
  }

  async addOffer(bookId: number, amount: number, user: User): Promise<Offer> {
    const book = await this.findOne(bookId);
    const offer = this.offerRepository.create({ amount, book, user });
    return this.offerRepository.save(offer);
  }

  async getTopOffers(bookId: number) {
    return this.offerRepository.find({
      where: { book: { id: bookId } },
      order: { amount: 'DESC' },
      take: 3,
    });
  }
}
