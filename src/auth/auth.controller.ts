import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Profile } from './interfaces/shared';
import { Public } from 'decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      response,
    );
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    try {
      const user: Profile = req.user;
      if (!user) throw new UnauthorizedException();
      const userId = user.sub;
      // console.log('userId', userId);
      const currentUser = this.authService.findUserById(userId);
      return currentUser;
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to get profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    // return req.user;
    try {
      const user = req.user;
      if (user) {
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        res.cookie('jwt', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 60 * 60 * 1000,
        });
      }

      res.redirect('https://gleaming-moxie-c073d0.netlify.app');
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to login with google',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('jwt');
      return { message: 'Logged out' };
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to logout',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
