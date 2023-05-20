import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Certificate } from './entities/certificate.entity';
import { PlateModule } from 'src/plate/plate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificate]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PlateModule
  ],
  controllers: [CertificatesController],
  providers: [CertificatesService]
})
export class CertificatesModule {}
