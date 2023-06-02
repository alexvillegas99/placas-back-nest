import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JWT_EXPIRES_IN, JWT_SECRET } from 'src/config/config.env';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        /* signOptions: { expiresIn: config.get(JWT_EXPIRES_IN) }, */
      }),

      inject: [ConfigService],
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy],
})
export class AuthModule {}
