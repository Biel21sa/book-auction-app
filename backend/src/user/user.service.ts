import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Offer } from '../entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offersRepository.create(createOfferDto);
    return this.offersRepository.save(offer);
  }

  async findOffersByUserId(userId: number): Promise<Offer[]> {
    return this.offersRepository.find({ where: { userId } });
  }
}
