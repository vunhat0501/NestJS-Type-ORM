import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { AuthJwtPayload } from 'src/auth/types/auth.jwtPayload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		@Inject(refreshJwtConfig.KEY)
		private refreshTokenJwtConfig: ConfigType<typeof refreshJwtConfig>,
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
		const token = this.jwtService.sign(payload);
		const refreshToken = this.jwtService.sign(
			payload,
			this.refreshTokenJwtConfig,
		);
		return {
			id: userId,
			token,
			refreshToken,
		};
	}

	// This method is used to refresh the token when it expires
	refreshToken(userId: number) {
		const payload: AuthJwtPayload = { sub: userId };
		const token = this.jwtService.sign(payload);
		return {
			id: userId,
			token,
		};
	}
}
