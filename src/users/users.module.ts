import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
