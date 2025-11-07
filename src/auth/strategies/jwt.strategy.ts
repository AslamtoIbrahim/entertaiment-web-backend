import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../utils/constants';
import { Payload } from '../interfaces/shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.jwt;
        },
      ]),
      //   ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      //   passReqToCallback: false,
    });
  }
  validate(payload: Payload) {
    return { userId: payload.sub, email: payload.email };
  }
}
