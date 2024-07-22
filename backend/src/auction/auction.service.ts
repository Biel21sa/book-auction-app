import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction } from '../entities/auction.entity';
import { Offer } from '../entities/offer.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async createAuction(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const auction = this.auctionRepository.create(createAuctionDto);
    return this.auctionRepository.save(auction);
  }

  async findAuctionById(id: number): Promise<Auction> {
    return this.auctionRepository.findOne({
      where: { id },
      relations: ['book', 'offers'],
    });
  }

  async findAllAuctions(): Promise<Auction[]> {
    return this.auctionRepository.find({ relations: ['book', 'offers'] });
  }

  async findOffersByAuctionId(auctionId: number): Promise<Offer[]> {
    return this.offerRepository.find({ where: { auction: { id: auctionId } } });
  }
}
