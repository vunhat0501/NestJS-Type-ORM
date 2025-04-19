import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';
import { PaginationDTO } from 'src/property/dto/pagination.dto';
// import { createPropertySchema, CreatePropertyZodDto } from 'src/property/dto/createPropertyZod.dto';
// import { HeadersDto } from 'src/property/dto/headers.dto';
import { UpdatePropertyDto } from 'src/property/dto/updateProperty.dto';
import { ParseIdPipe } from 'src/property/pipes/parsedIdPipe';
// import { RequestHeader } from 'src/property/pipes/request-header';
// import { ZodValidationPipe } from 'src/property/pipes/zodValidationPipe';
import { PropertyService } from 'src/property/property.service';

@Controller('property')
export class PropertyController {
	constructor(private propertyService: PropertyService) {
		// this.propertyService = new PropertyService();
	}

	@Get()
	findAll(@Query() paginationDTO: PaginationDTO) {
		return this.propertyService.findAll(paginationDTO);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.propertyService.findOne(id);
	}

	@Post()
	// @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	// @UsePipes(new ZodValidationPipe(createPropertySchema))
	create(@Body() dto: CreatePropertyDto) {
		return this.propertyService.create(dto);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIdPipe) id,
		// @RequestHeader(new ValidationPipe({ validateCustomDecorators: true})) header: HeadersDto,
		@Body() body: UpdatePropertyDto,
	) {
		return this.propertyService.update(id, body);
	}

	@Delete(':id')
	delete(@Param('id', ParseIdPipe) id: number) {
		return this.propertyService.delete(id);
	}
}
