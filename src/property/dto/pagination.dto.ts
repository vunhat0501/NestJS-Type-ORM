import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
	@IsNumber()
	@IsPositive()
	@IsOptional()
	skip: number; //** number of record being skip b4 return the result */

	@IsNumber()
	@IsPositive()
	@IsOptional()
	limit: number; //** limit the record return in a single query */
}
