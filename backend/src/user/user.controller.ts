import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { Offer } from '../entities/offer.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post('offer')
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({
    status: 201,
    description: 'The offer has been successfully created.',
    type: Offer,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.userService.createOffer(createOfferDto);
  }

  @Get(':id/offers')
  @ApiOperation({ summary: 'Get offers by user ID' })
  @ApiResponse({ status: 200, description: 'List of offers', type: [Offer] })
  @ApiResponse({ status: 404, description: 'Offers not found' })
  findOffersByUserId(@Param('id') id: string): Promise<Offer[]> {
    return this.userService.findOffersByUserId(+id);
  }
}
