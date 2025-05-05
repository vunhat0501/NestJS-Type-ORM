import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
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
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: refreshJwtConfiguration.secret || 'defaultSecret',
			ignoreExpiration: false,
		});
	}

	validate(payload: AuthJwtPayload) {
		return { id: payload.sub };
	}
}
