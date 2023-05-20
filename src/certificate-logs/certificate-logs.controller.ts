import { Controller } from '@nestjs/common';
import { CertificateLogsService } from './certificate-logs.service';

@Controller('certificate-logs')
export class CertificateLogsController {
  constructor(private readonly certificateLogsService: CertificateLogsService) {}
}
