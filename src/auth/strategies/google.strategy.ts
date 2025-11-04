import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { GoogleProfile } from '../interfaces/sign-in-response';
 

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifiedCallback,
  ) {
    try {
      const user = this.authService.validateGoogleUser(profile);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
