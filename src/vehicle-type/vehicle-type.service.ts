import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleType } from './entities/vehicle-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,
  ) {}
  async create() {
    const newArray = [{ name: 'Vehículo' }, { name: 'Moto' }];

    newArray.forEach(async (element) => {
      const existingPlateType = await this.vehicleTypeRepository.findOne({
        where: { name: element.name },
      });
      if (!existingPlateType) {
        await this.vehicleTypeRepository.insert(element);
      }
    });

    return { message: 'Tipos de vehículos creados' };
  }

  async findAll() {
    return await this.vehicleTypeRepository.find({ where: { isActive: true } });
  }
}
