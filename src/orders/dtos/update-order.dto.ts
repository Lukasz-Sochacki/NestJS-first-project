import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 30)
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
