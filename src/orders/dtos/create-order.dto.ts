import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  client: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  address: string;
}
