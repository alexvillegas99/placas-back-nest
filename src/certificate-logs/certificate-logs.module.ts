import { Module } from '@nestjs/common';
import { CertificateLogsService } from './certificate-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateLogs } from './entities/ceretificate-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CertificateLogs])
  ],
  providers: [CertificateLogsService],
  exports:[CertificateLogsService]
})
export class CertificateLogsModule {}
