import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CertificateLogs } from './entities/ceretificate-log.entity';
import { Repository } from 'typeorm';
import { CertificateLogsDto } from './dto/create-certificate-log.dto';

@Injectable()
export class CertificateLogsService {
    constructor(
        @InjectRepository(CertificateLogs)
        private readonly certificateLogsRepository: Repository<CertificateLogs>,
      ) {}
      async create(certificateLogsDto: CertificateLogsDto) {
        console.log('creando log')
        const plateLog =  await this.certificateLogsRepository.create(certificateLogsDto);
        await this.certificateLogsRepository.save(plateLog);
      }
}
