import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { GoogleProfile, SignInResponse } from './interfaces/sign-in-response';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;
    const hashPass = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser({
      username,
      email,
      password: hashPass,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async signIn(
    email: string,
    pass: string,
    res: Response,
  ): Promise<SignInResponse> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();

    // 📙 hash password and compare
    if (!user.password) throw new UnauthorizedException('Password is null');
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    // 📙 generate JWT
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    // return {
    //   ...result,
    //   access_token: token,
    // };

    res.cookie('jwt', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: true,
      // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // return { id: user.id, username: user.username, email: user.email };
    return result;
  }

  async validateGoogleUser(profile: GoogleProfile) {
    if (!profile.emails || profile.emails.length === 0) {
      throw new UnauthorizedException('No Email found in Google profile');
    }

    let user = await this.usersService.findUserByEmail(profile.emails[0].value);
    if (!user) {
      user = await this.usersService.createUser({
        username: `${profile.name?.givenName} ${profile.name?.familyName}`,
        email: profile.emails[0].value,
        password: null,
        provider: 'google',
        image: profile.photos?.[0]?.value ?? null,
      });
    }

    return user;
    // return { ...user, access_token: token };
  }

  async findUserById(userId: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      image: user.image,
    };
  }
}
