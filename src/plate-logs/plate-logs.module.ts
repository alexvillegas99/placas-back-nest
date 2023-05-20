import { Module } from '@nestjs/common';
import { PlateLogsService } from './plate-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateLogs } from './entities/plate-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlateLogs])
  ],
  providers: [PlateLogsService],
  exports:[PlateLogsService]
})
export class PlateLogsModule {}
