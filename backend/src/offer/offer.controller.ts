import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from 'src/entities/offer.entity';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerService.createOffer(createOfferDto);
  }

  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Offer> {
    return this.offerService.findOne(+id);
  }
}
