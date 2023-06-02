import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Certificate } from './entities/certificate.entity';
import { PlateModule } from 'src/plate/plate.module';
import { CertificateLogsModule } from 'src/certificate-logs/certificate-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificate]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PlateModule,
    CertificateLogsModule
  ],
  controllers: [CertificatesController],
  providers: [CertificatesService]
})
export class CertificatesModule {}
