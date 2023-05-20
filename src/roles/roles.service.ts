import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly RolesRepository: Repository<Roles>,
  ) {}
  async create() {
    const newArray = [{ name: 'ADMIN' }, { name: 'USER' }];

    newArray.forEach(async (element) => {
      const existingPlateType = await this.RolesRepository.findOne({
        where: { name: element.name },
      });
      if (!existingPlateType) {
        await this.RolesRepository.insert(element);
      }
    });

    return { message: 'Tipos de roles creados' };
  }

  async findAll() {
    return await this.RolesRepository.find({ where: { isActive: true } });
  }
}
