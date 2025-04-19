import { IsPositive, IsString } from 'class-validator';

export class IdParamDto {
	@IsString()
	@IsPositive()
	id: number;
}
