import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';
import { PaginationDTO } from 'src/property/dto/pagination.dto';
import { UpdatePropertyDto } from 'src/property/dto/updateProperty.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {
	constructor(
		@InjectRepository(Property) private propertyRepo: Repository<Property>,
	) {}

	async findAll(paginationDTO: PaginationDTO) {
		return await this.propertyRepo.find({
			skip: paginationDTO.skip,
			take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE,
		});
	}
	async findOne(id: number) {
		const property = await this.propertyRepo.findOne({
			where: {
				id,
			},
		});

		if (!property) throw new NotFoundException();
		return property;
	}
	async create(dto: CreatePropertyDto) {
		return await this.propertyRepo.save(dto);
	}
	async update(id: number, dto: UpdatePropertyDto) {
		return await this.propertyRepo.update({ id }, dto);
	}
	async delete(id: number) {
		return await this.propertyRepo.delete({
			id,
		});
	}
}
