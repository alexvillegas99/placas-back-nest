import { Module } from '@nestjs/common';
import { PlateTypeService } from './plate-type.service';
import { PlateTypeController } from './plate-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { PlateType } from './entities/plate-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlateType]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PlateTypeController],
  providers: [PlateTypeService]
})
export class PlateTypeModule {}
