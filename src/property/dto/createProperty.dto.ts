import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 10, { message: 'error on length' })
  name: string;

  @IsString()
  @Length(2, 10, { groups: ['create'] })
  @Length(2, 15, { groups: ['update'] })
  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}
