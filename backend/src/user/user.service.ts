import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findUser(userNameOrEmail: string) {
    const user = await this.userRepository.findOne({
      where: [{ username: userNameOrEmail }, { email: userNameOrEmail }],
      relations: ['type'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.buildUserResponse(user);
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  private buildUserResponse(user: any) {
    if (!user) return null;

    return {
      ...user,
      roles: user?.UserType?.map((type) => type?.name) || [],
    };
  }
}
