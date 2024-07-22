import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  auctionId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}
