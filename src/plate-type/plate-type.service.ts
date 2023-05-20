import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlateType } from './entities/plate-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlateTypeService {
  constructor(
    @InjectRepository(PlateType)
    private readonly plateTypeRepository: Repository<PlateType>,
  ) {}
  async create() {
    const newArray = [
      { name: 'Particular' },
      { name: 'Publico' },
      { name: 'Estatal' },
      { name: 'Municipal' },
    ];

    newArray.forEach(async (element) => {
      const existingPlateType = await this.plateTypeRepository.findOne({
        where: { name: element.name },
      });
      if (!existingPlateType) {
        await this.plateTypeRepository.insert(element);
      }
    });

    return { message: 'Tipos de placas creados' };
  }

  async findAll() {
    return await this.plateTypeRepository.find({ where: { isActive: true } });
  }
}
