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
      const newCertificate =
        this.certificateRepository.create(createCertificateDto);
      const certificate = await this.certificateRepository.save(newCertificate);

      await this.plateService.update(createCertificateDto.plate, {
        status: true,
        user: createCertificateDto.user,
      });
      const plate = await this.plateService.findOne(createCertificateDto.plate);
      this.certificateLogsService.create({
        plate: plate.plate,
        identification: createCertificateDto.identification,
        observation: createCertificateDto.observation,
        user: createCertificateDto.user,
        payload: PayloadActions.CREATED,
      });
      return certificate;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('El certificado de esta placa ya existe');
      }
      if (error.errno === 1452) {
        throw new BadRequestException('No existe la placa ingresada');
      }
    }
  }

  async findAll() {
    const certificates = await this.certificateRepository
      .createQueryBuilder('certificate')
      .innerJoin('certificate.plate', 'plate')
      .innerJoin('certificate.user', 'user')
      .select(['certificate', 'plate','user.name'])
      .where('plate.isActive=true')
      .getMany();

    return certificates;
  }

  async find(filter: string) {
    const plates = await this.certificateRepository
    .createQueryBuilder('certificate')
    .innerJoin('certificate.plate', 'plate')
    .innerJoin('certificate.user', 'user')
    .select(['certificate', 'plate.plate','user.name'])
    .where('plate.isActive=true')
    .getMany();

    return plates.filter(
      (element) =>
        element.identification.toLocaleLowerCase().includes(filter) ||
        element.name.toLocaleLowerCase().includes(filter) ||
        element.plate.plate.toLocaleLowerCase().includes(filter) ||
        element.observation.toLocaleLowerCase().includes(filter),
    );
  }

  
  /*  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  } */

  async update(id: number, updateCertificateDto: UpdateCertificateDto) {
    try {
      const certificate = await this.certificateRepository.findOne({
        where: { id },
      });

      if (!certificate) {
        throw new Error(`Certificate with ID ${id} not found.`);
      }


      const validatedDto = plainToClass(
        UpdateCertificateDto,
        updateCertificateDto,
      );
      // Validar los campos
      const errors = await validate(validatedDto);

      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.toString()}`);
      }

      certificate.amount = updateCertificateDto.amount;
      certificate.identification = updateCertificateDto.identification;
      certificate.name = updateCertificateDto.name;
      certificate.number = updateCertificateDto.number;
      certificate.observation = updateCertificateDto.observation;

      const updatedPlate = await this.certificateRepository.save(certificate);
      const plate = await this.plateService.findOne(updateCertificateDto.plate);
      this.certificateLogsService.create({
        plate: plate.plate,
        identification: updateCertificateDto.identification,
        observation: updateCertificateDto.observation,
        user: updateCertificateDto.user,
        payload: PayloadActions.UPDATED,
      });
      return updatedPlate;
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
