import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email',
		});
	}

	validate(email: string, password: string) {
		//** Prevent user login without providing password
		// * This part exist because user sign up with OAth2 doesn't have password */
		if (password === '')
			throw new UnauthorizedException('Password cannot be empty!');

		return this.authService.validateUser(email, password);
	}
}
