import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import refreshJwtConfig from 'src/auth/config/refresh-jwt.config';
import { AuthJwtPayload } from 'src/auth/types/auth.jwtPayload';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

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

  async login(userId: number) {
    // const payload: AuthJwtPayload = { sub: userId };
    // const token = this.jwtService.sign(payload);
    // const refreshToken = this.jwtService.sign(
    //   payload,
    //   this.refreshTokenJwtConfig,
    // );
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    // Hash the refresh token using argon2
    const hashedRefreshToken = await argon2.hash(refreshToken);

    // Store the hashed refresh token in the database
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  // This method generates both access and refresh tokens
  // It uses Promise.all to generate both tokens concurrently for better performance
  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenJwtConfig),
    ]);

    return { accessToken, refreshToken };
  }

  //** This is for create refresh token
  // When this function get called, it will update the hashed refresh token in database a long as create a refresh token for user */
  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    // Hash the refresh token using argon2
    const hashedRefreshToken = await argon2.hash(refreshToken);

    // Store the hashed refresh token in the database
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  // This refresh token is not in hash form because this extract the token from the request header
  async validateRefreshToken(userId: number, refreshToken: string) {
    // Get the user data by ID
    const user = await this.userService.findOne(userId);
    // Check if the user exists and has a hashed refresh token
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token!');
    }

    // Check if the provided refresh token matches the hashed refresh token stored in the database
    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    // If the refresh token does not match, throw an UnauthorizedException
    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh token!');
    }

    return { id: userId };
  }

  async logout(userId: number) {
    await this.userService.updateHashedRefreshToken(userId, '');
  }
}
