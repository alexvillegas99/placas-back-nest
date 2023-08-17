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
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CertificateLogsService } from 'src/certificate-logs/certificate-logs.service';
import { PayloadActions } from 'src/common/helpers/emuns/payload-actions.emun';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    private readonly plateService: PlateService,
    private readonly certificateLogsService: CertificateLogsService,
  ) {}
  async create(createCertificateDto: CreateCertificateDto) {
    try {
      const newCertificate = await this.certificateRepository.create(
        createCertificateDto,
      );
      const certificate = await this.certificateRepository.save(newCertificate);

      createCertificateDto.plates.forEach(async (element) => {
        await this.plateService.update(Number(element), {
          status: true,
          user: createCertificateDto.user,
        });
        this.certificateLogsService.create({
          identification: createCertificateDto.identification,
          observation: createCertificateDto.observation,
          user: createCertificateDto.user,
          payload: PayloadActions.CREATED,
          plate: element,
        });
      });
      const data = [];
      for (let index = 0; index < certificate.plates.length; index++) {
        data.push(
          await this.plateService.findOne(Number(certificate.plates[index])),
        );
      }

      certificate.plates = data;
      await setTimeout(() => {}, 100);
      return certificate;
    } catch (error) {}
  }

  async findAll() {
    const certificates = await this.certificateRepository
      .createQueryBuilder('certificate')
      .innerJoin('certificate.user', 'user')
      .select(['certificate', 'user.name'])
      .getMany();

    for (let i = 0; i < certificates.length; i++) {
      const data = [];
      for (let j = 0; j < certificates[i].plates.length; j++) {
        data.push(
          await this.plateService.findOne(Number(certificates[i].plates[j])),
        );
      }
      certificates[i].plates = data;
    }

    return certificates;
  }

  async find(filter: string) {

    const certificates = await this.certificateRepository
      .createQueryBuilder('certificate')
      .innerJoin('certificate.user', 'user')
      .select(['certificate', 'user.name'])
      .getMany();

    for (let i = 0; i < certificates.length; i++) {
      const data = [];
      for (let j = 0; j < certificates[i].plates.length; j++) {
        const plate = await this.plateService.findOne(
          Number(certificates[i].plates[j]),
        );
        data.push(plate);
      }
      certificates[i].plates = data;
    }

    return certificates.filter(
      (element) =>
        element.identification.toLocaleLowerCase().includes(filter) ||
        element.name.toLocaleLowerCase().includes(filter) ||
        element.observation.toLocaleLowerCase().includes(filter) 
    );
  }

  /*  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  } */

  async update(id: number, updateCertificateDto: UpdateCertificateDto) {
    try {
      await this.certificateRepository.update(id, {
        ...updateCertificateDto,
      });
      const data = await this.certificateRepository.find({ where: { id } });

      return data;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('El certificado de esta placa ya existe');
      }
      if (error.errno === 1452) {
        throw new BadRequestException('No existe la placa ingresada');
      }
    }
  }

  async remove(id: number, idUser: number) {
    const certificate = await this.certificateRepository.findOne({
      where: { id },
    });

    if (!certificate)
      throw new BadRequestException(
        `El certificado con el ${id} no se encontró.`,
      );

    certificate.isActive = false;

    await this.certificateRepository.save(certificate);
    const plate = await this.plateService.findOne(id);

    return { message: 'Placa removida' };
  }

  
}
