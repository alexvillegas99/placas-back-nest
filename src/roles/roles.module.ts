import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Roles } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
