import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plate } from './entities/plate.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { PlateLogsService } from 'src/plate-logs/plate-logs.service';
import { PayloadActions } from 'src/common/helpers/emuns/payload-actions.emun';
@Injectable()
export class PlateService {
  constructor(
    @InjectRepository(Plate)
    private readonly plateRepository: Repository<Plate>,
    private readonly PlateLogService: PlateLogsService,
  ) {}

  async create(createPlateDto: CreatePlateDto) {
    const newPlate = this.plateRepository.create(createPlateDto);
    const plate = await this.plateRepository.save(newPlate);
    this.PlateLogService.create({
      plate: plate.plate,
      plate_type: plate.plate_type,
      vehicle_type: plate.vehicle_type,
      user: plate.user,
      payload: PayloadActions.CREATED,
      status_plate: plate.isActive,
    });
    return plate;
  }

  async findAll() {
    const plates = await this.plateRepository
      .createQueryBuilder('plate')
      .leftJoinAndSelect('plate.user', 'user', 'plate.userId = user.id')
      .select(['plate', 'user.name'])
      .where('plate.isActive=true')
      .getMany();

    return plates;
  }

  async findOne(id: number) {
    const plates = await this.plateRepository
      .createQueryBuilder('plate')
      .leftJoinAndSelect('plate.user', 'user', 'plate.userId = user.id')
      .select(['plate', 'user.name'])
      .where('plate.id=:id && plate.isActive=true', { id })
      .getOne();
    return plates;
  }

  async update(id: number, updatePlateDto: UpdatePlateDto) {
    
    const plate = await this.plateRepository.findOne({ where: { id } });

    if (!plate) {
      throw new Error(`Plate with ID ${id} not found.`);
    }
    const validatedDto = plainToClass(UpdatePlateDto, updatePlateDto);
    // Validar los campos
    const errors = await validate(validatedDto);

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.toString()}`);
    }

    plate.plate = updatePlateDto.plate;
    plate.plate_type = updatePlateDto.plate_type;
    plate.user = updatePlateDto.user;
    plate.vehicle_type = updatePlateDto.vehicle_type;
    if(updatePlateDto.status){
      plate.status = updatePlateDto.status;
    }

    const updatedPlate = await this.plateRepository.save(plate);
    this.PlateLogService.create({
      plate: updatedPlate.plate,
      plate_type: updatedPlate.plate_type,
      vehicle_type: updatedPlate.vehicle_type,
      user: updatedPlate.user,
      payload: PayloadActions.UPDATED,
      status_plate: plate.isActive,
    });
    return updatedPlate;
  }

  async remove(id: number, idUser: any) {
    const plate = await this.plateRepository.findOne({ where: { id } });

    if (!plate) throw new BadRequestException(`La placa con el ${id} no se encontró.`);

    plate.user = idUser;
    plate.isActive = false;

    await this.plateRepository.save(plate);
    this.PlateLogService.create({
      plate: plate.plate,
      plate_type: plate.plate_type,
      vehicle_type: plate.vehicle_type,
      user: plate.user,
      payload: PayloadActions.DELETED,
      status_plate: false,
    });
    return { message: 'Placa removida' };
  }
}
