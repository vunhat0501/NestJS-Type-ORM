import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';
import googleOauthConfig from 'src/auth/config/google-oauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(googleOauthConfig.KEY)
		private googleConfiguration: ReturnType<typeof googleOauthConfig>,
		private authService: AuthService,
	) {
		if (
			!googleConfiguration.clientId ||
			!googleConfiguration.clientSecret ||
			!googleConfiguration.callbackURl
		) {
			throw new Error(
				'Google OAuth configuration is missing. Please check your environment variables.',
			);
		}

		super({
			clientID: googleConfiguration.clientId,
			clientSecret: googleConfiguration.clientSecret,
			callbackURL: googleConfiguration.callbackURl,
			scope: ['email', 'profile'],
		});
	}

	async validate(
		//! DO NOT send these token to user because they are created by Google and can't be verified by Jwt strategy
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	) {
		// console.log('Google profile:', profile);
		const user = await this.authService.validateGoogleUser({
			//** Only get the first email and photo in the list */
			email: profile.emails[0].value,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			avatarUrl: profile.photos[0].value,
			password: '', // Password is not used for OAuth users
		});
		//** The first parameter is an error object which this function doesn't have */
		done(null, user);
	}
}
