import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthJwtPayload } from 'src/auth/types/auth.jwtPayload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new UnauthorizedException('User not found!');

		const isPasswordMatch = await compare(password, user.password);
		if (!isPasswordMatch)
			throw new UnauthorizedException('Invalid credentials!');

		return { id: user.id };
	}

	login(userId: number) {
		const payload: AuthJwtPayload = { sub: userId };
		return this.jwtService.sign(payload);
	}
}
