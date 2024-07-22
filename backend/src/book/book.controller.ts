import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @GetUser() user: User) {
    return this.bookService.create(createBookDto, user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.bookService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Get()
  async filterBooks(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('genre') genre?: string,
  ) {
    return this.bookService.filterBooks(title, author, genre);
  }

  @Post(':id/offer')
  async addOffer(
    @Param('id') id: number,
    @Body('amount') amount: number,
    @GetUser() user: User,
  ) {
    return this.bookService.addOffer(id, amount, user);
  }

  @Get(':id/offers')
  async getTopOffers(@Param('id') bookId: number) {
    return this.bookService.getTopOffers(bookId);
  }
}
