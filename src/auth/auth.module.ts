import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { RefreshJwtStrategy } from 'src/auth/strategies/refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import googleOauthConfig from 'src/auth/config/google-oauth.config';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync(jwtConfig.asProvider()),
		ConfigModule.forFeature(jwtConfig),
		ConfigModule.forFeature(refreshJwtConfig),
		ConfigModule.forFeature(googleOauthConfig),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		LocalStrategy,
		JwtStrategy,
		RefreshJwtStrategy,
		GoogleStrategy,
		//** Registering the guards globally
		// * This means that these guards will be applied to all routes in the application */
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AuthModule {}
