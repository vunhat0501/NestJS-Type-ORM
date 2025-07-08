import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Request,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from 'src/auth/guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Public } from 'src/auth/decorator/public.decorator';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user.id);
	}

	@UseGuards(RefreshAuthGuard)
	@Post('refresh')
	refreshToken(@Req() req) {
		return this.authService.refreshToken(req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	signOut(@Req() req) {
		this.authService.logout(req.user.id);
	}

	@Public()
	@UseGuards(GoogleAuthGuard)
	@Get('google/login')
	googleLogin() {}

	@Public()
	@UseGuards(GoogleAuthGuard)
	@Get('google/callback')
	async googleCallback(@Req() req, @Res() res) {
		const response = await this.authService.login(req.user.id);
		//** Redirect to the frontend with the access token */
		res.redirect(`http//:localhost:5173?token=${response.accessToken}`);
	}
}
