import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Plate } from './entities/plate.entity';
import { PlateLogsModule } from 'src/plate-logs/plate-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plate]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PlateLogsModule,
  ],
  controllers: [PlateController],
  providers: [PlateService],
  exports:[PlateService]
})
export class PlateModule {}
