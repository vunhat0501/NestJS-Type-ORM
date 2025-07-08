import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { AuthJwtPayload } from 'src/auth/types/auth.jwtPayload';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
	Strategy,
	'refresh-jwt',
) {
	constructor(
		@Inject(refreshJwtConfig.KEY)
		private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
		private authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: refreshJwtConfiguration.secret || 'defaultSecret',
			ignoreExpiration: false,
			passReqToCallback: true,
		});
	}

	//** Refresh token is in the field calls Authorization with value start with Bearer
	// Authorization: Bearer a_very_long_string_of__not_hash_token */

	validate(req: Request, payload: AuthJwtPayload) {
		// Extract the refresh token from the request headers
		const refreshToken = req
			.get('Authorization')
			?.replace('Bearer ', '')
			.trim();
		// Extract the user ID from the JWT payload
		const userId = payload.sub;

		if (!refreshToken) {
			throw new Error('Refresh token not found in Authorization header');
		}

		return this.authService.validateRefreshToken(userId, refreshToken);
	}
}
