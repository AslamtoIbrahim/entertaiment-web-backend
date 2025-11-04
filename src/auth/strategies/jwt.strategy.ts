import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: (req) => req?.cookies?.Authentication,
      //   ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      //   passReqToCallback: false,
    });
  }
  async validate(payload: any) {
    console.log('payload *********: ', payload.email);
    return { userId: payload.sub, email: payload.email };
  }
}
