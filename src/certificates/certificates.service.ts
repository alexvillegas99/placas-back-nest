import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './entities/certificate.entity';
import { Repository } from 'typeorm';
import { PlateService } from 'src/plate/plate.service';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    private readonly plateService: PlateService,
  ) {}
  async create(createCertificateDto: CreateCertificateDto) {
    try {
      const newCertificate =
        this.certificateRepository.create(createCertificateDto);
      const certificate = await this.certificateRepository.save(newCertificate);

      await this.plateService.update(createCertificateDto.plate, {
        status: true,
        user: createCertificateDto.user,
      });

      return certificate;
    } catch (error) {
      console.log(error);
      if (error.errno === 1062) {
        throw new ConflictException('El certificado de esta placa ya existe');
      }
      if (error.errno === 1062) {
        throw new BadRequestException('No existe la placa ingresada');
      }
    }
  }

  async findAll() {
    const certificates = await this.certificateRepository
      .createQueryBuilder('certificate')
      .leftJoinAndSelect(
        'certificate.plate',
        'plate',
        'plate.id = certificate.plateId',
      )
      .select(['certificate', 'plate.plate'])
      .where('plate.isActive=true')
      .getMany();

    return certificates;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  }

  update(id: number, updateCertificateDto: UpdateCertificateDto) {
    return `This action updates a #${id} certificate`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificate`;
  }
}
