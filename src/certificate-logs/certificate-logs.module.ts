import { Module } from '@nestjs/common';
import { CertificateLogsService } from './certificate-logs.service';
import { CertificateLogsController } from './certificate-logs.controller';

@Module({
  controllers: [CertificateLogsController],
  providers: [CertificateLogsService]
})
export class CertificateLogsModule {}
