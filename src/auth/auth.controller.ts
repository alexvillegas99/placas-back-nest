import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Auth, User } from 'src/common/helpers/decorators';
import { User as UserEntity } from 'src/users/entities';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: any, @User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'Login exitoso',
      data,
    };
  }

  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'Petición correcta',
      user,
    };
  }

  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
}