import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() req) {
		return this.userService.findOne(req.user.id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	/*
  // @SetMetadata('role', [Role.ADMIN])
  */
	@Roles(Role.ADMIN, Role.EDITOR)
	//* * Can set the role decorator at the top of the controller
	// * If set another role decorator in the function, it will higher priority */
	// @UseGuards(RolesGuard)
	// @UseGuards(JwtAuthGuard)
	//** This is a callback function so the JwtAuthGuard will be call first then RoleGuard */
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
