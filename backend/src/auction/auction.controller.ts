import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from '../entities/auction.entity';
import { Offer } from '../entities/offer.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@ApiTags('auctions')
@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('seller')
  @Post()
  @ApiOperation({ summary: 'Create a new auction' })
  @ApiResponse({
    status: 201,
    description: 'The auction has been successfully created.',
    type: Auction,
  })
  async createAuction(
    @Body() createAuctionDto: CreateAuctionDto,
  ): Promise<Auction> {
    return this.auctionService.createAuction(createAuctionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auction by id' })
  @ApiResponse({ status: 200, description: 'Auction found', type: Auction })
  @ApiResponse({ status: 404, description: 'Auction not found' })
  async findAuctionById(@Param('id') id: number): Promise<Auction> {
    const auction = await this.auctionService.findAuctionById(id);
    if (!auction) {
      throw new NotFoundException('Auction not found');
    }
    return auction;
  }

  @Get()
  @ApiOperation({ summary: 'Get all auctions' })
  @ApiResponse({
    status: 200,
    description: 'Return all auctions',
    type: [Auction],
  })
  async findAllAuctions(): Promise<Auction[]> {
    return this.auctionService.findAllAuctions();
  }

  @Get(':id/offers')
  @ApiOperation({ summary: 'Get offers by auction id' })
  @ApiResponse({
    status: 200,
    description: 'Return all offers for a specific auction',
    type: [Offer],
  })
  @ApiResponse({
    status: 404,
    description: 'Offers not found for this auction',
  })
  async findOffersByAuctionId(@Param('id') id: number): Promise<Offer[]> {
    const offers = await this.auctionService.findOffersByAuctionId(id);
    if (!offers) {
      throw new NotFoundException('Offers not found for this auction');
    }
    return offers;
  }
}
