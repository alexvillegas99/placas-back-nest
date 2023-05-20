import { Injectable } from '@nestjs/common';
import { CreatePlateLogDto } from './dto/create-plate-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlateLogs } from './entities/plate-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlateLogsService {
  constructor(
    @InjectRepository(PlateLogs)
    private readonly PlateLogsRepository: Repository<PlateLogs>,
  ) {}
  async create(createPlateLogDto: CreatePlateLogDto) {
    const plateLog =  await this.PlateLogsRepository.create(createPlateLogDto);
    await this.PlateLogsRepository.save(plateLog);
  }
}
