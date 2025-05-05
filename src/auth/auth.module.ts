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

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync(jwtConfig.asProvider()),
		ConfigModule.forFeature(jwtConfig),
		ConfigModule.forFeature(refreshJwtConfig),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		LocalStrategy,
		JwtStrategy,
		RefreshJwtStrategy,
	],
})
export class AuthModule {}
